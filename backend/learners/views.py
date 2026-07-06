from django.shortcuts import render

# # Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import LearnerProfile
from .serializers import CourseDetailSerializer, LearnerOnboardingSerializer


from courses.models import Course, Enrollment
from .serializers import CourseListSerializer
from courses.models import Session
from .serializers import SessionDetailSerializer
    
from courses.models import Quiz
from courses.serializers import QuizSerializer
from courses.models import SessionProgress


class LearnerOnboardingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        # print("COOKIES:", request.COOKIES)
        # print("USER:", request.user)
        
        
        user = request.user

        profile, created = LearnerProfile.objects.get_or_create(user=user)

        serializer = LearnerOnboardingSerializer(
            profile, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()

            # USER MODEL 
            user.onboarding_completed = True
            user.save()

            return Response(
                {
                    "status": "success",
                    "message": "Onboarding saved successfully",
                    "onboarding_completed": user.onboarding_completed
                },
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# courses/views.py
  


class LearnerCourseListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = Course.objects.filter(
            status="Published"
        ).prefetch_related("sessions")

        serializer = CourseListSerializer(
            courses,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)


class LearnerCourseEnrollView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):

        try:
            course = Course.objects.get(
                id=course_id,
                status="Published"
            )

        except Course.DoesNotExist:

            return Response(
                {"detail": "Course not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        enrollment, created = Enrollment.objects.get_or_create(
            learner=request.user,
            course=course
        )

        if not created:
            return Response(
                {"detail": "Already enrolled"},
                status=status.HTTP_200_OK
            )

        return Response(
            {"detail": "Enrolled successfully"},
            status=status.HTTP_201_CREATED
        )
        
class LearnerCourseDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        course = Course.objects.get(id=course_id)

        serializer = CourseDetailSerializer(
            course,
            context={"request": request}
        )

        return Response(serializer.data)
    




class LearnerSessionDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):

        session = Session.objects.get(id=id)

        serializer = SessionDetailSerializer(session)

        data = serializer.data

        course = session.course

        enrollment = Enrollment.objects.filter(
            learner=request.user,
            course=course
        ).first()

        data["progress"] = (
            enrollment.progress
            if enrollment else 0
        )

        return Response(data)


class LearnerQuizView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, session_id):

        quizzes = Quiz.objects.filter(
            session_id=session_id
        )

        serializer = QuizSerializer(
            quizzes,
            many=True
        )

        return Response(serializer.data)
    
class MarkSessionCompleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):

        session = Session.objects.get(id=id)

        SessionProgress.objects.get_or_create(
            learner=request.user,
            session=session,
            defaults={"completed": True}
        )

        course = session.course

        enrollment = Enrollment.objects.get(
            learner=request.user,
            course=course
        )

        total_sessions = course.sessions.count()

        completed_sessions = SessionProgress.objects.filter(
            learner=request.user,
            session__course=course,
            completed=True
        ).count()

        progress = int(
            (completed_sessions / total_sessions) * 100
        )

        enrollment.progress = progress

        if progress == 100:
            enrollment.completed = True

        enrollment.save()

        return Response({
            "message": "Session completed",
            "progress": progress
        })