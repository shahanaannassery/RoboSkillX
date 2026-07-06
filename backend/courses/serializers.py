from rest_framework import serializers
from .models import Course, Session, Quiz


class QuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quiz
        fields = "__all__"


class SessionSerializer(serializers.ModelSerializer):

    course_title = serializers.CharField(
        source="course.title",
        read_only=True
    )
    mentor_name = serializers.CharField(
        source="mentor.user.full_name",
        read_only=True
    )

    quizzes = QuizSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Session
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):

    mentor_names = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = "__all__"

    def get_mentor_names(self, obj):

        return [
            {
                "id": mentor.id,
                "name": mentor.user.full_name,
                "email": mentor.user.email,
            }
            for mentor in obj.mentors.all()
        ]
 

class QuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quiz
        fields = [
            "id",
            "session",
            "question",
            "option_a",
            "option_b",
            "option_c",
            "option_d",
            "correct_answer",
        ]