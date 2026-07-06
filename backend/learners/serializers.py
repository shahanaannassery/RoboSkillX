from rest_framework import serializers
from mentors.models import MentorProfile
from .models import LearnerProfile

from courses.models import Course, Enrollment
from courses.models import Session
from courses.models import SessionProgress




class LearnerOnboardingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnerProfile
        fields = [
            "age_group",
            "skill_level",
            "interests",
            "uses_laptop",
            "uses_mobile",
            "has_hardware_kit",
            "onboarding_completed",
        ]
        
# courses/serializers.py  


class CourseListSerializer(serializers.ModelSerializer):
    is_enrolled = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()
    lesson_count = serializers.SerializerMethodField()
    mentor_name = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "thumbnail",
            "level",
            "lesson_count",
            "mentor_name",
            "is_enrolled",
            "progress",
        ]

    def _get_enrollment(self, obj):
        request = self.context.get("request")

        if request and request.user.is_authenticated:
            return Enrollment.objects.filter(
                learner=request.user,
                course=obj
            ).first()

        return None

    def get_is_enrolled(self, obj):
        return self._get_enrollment(obj) is not None

    def get_progress(self, obj):
        enrollment = self._get_enrollment(obj)
        return enrollment.progress if enrollment else 0

    def get_lesson_count(self, obj):
        return obj.sessions.count()

    def get_mentor_name(self, obj):
        mentors = obj.mentors.all()

        return ", ".join(
            mentor.user.get_full_name() or mentor.user.email
            for mentor in mentors
    )
        

        


class CourseDetailSerializer(serializers.ModelSerializer):

    mentor_names = serializers.SerializerMethodField()
    sessions = serializers.SerializerMethodField()
    is_enrolled = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "thumbnail",
            "level",
            "duration",
            "total_sessions",
            "mentor_names",
            "sessions",
            "is_enrolled",
        ]

    def get_is_enrolled(self, obj):
        request = self.context.get("request")

        if request and request.user.is_authenticated:
            return Enrollment.objects.filter(
                learner=request.user,
                course=obj
            ).exists()

        return False

    def get_mentor_names(self, obj):
        return [
            mentor.user.full_name
            for mentor in obj.mentors.all()
        ]

    def get_sessions(self, obj):

        request = self.context.get("request")

        sessions = []

        for session in obj.sessions.all():

            completed = False

            if request and request.user.is_authenticated:
                completed = SessionProgress.objects.filter(
                    learner=request.user,
                    session=session,
                    completed=True
                ).exists()

            sessions.append({
                "id": session.id,
                "title": session.title,
                "duration": session.duration,
                "completed": completed,
            })

        return sessions
        
from courses.models import Session

class SessionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = "__all__"