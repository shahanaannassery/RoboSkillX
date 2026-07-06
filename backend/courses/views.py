from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from urllib3 import request
from .models import Course,Session
from .serializers import CourseSerializer
from .models import Session, Quiz
from rest_framework import generics

from mentors.models import MentorProfile
from .models import Enrollment

from .serializers import (
    SessionSerializer,
    QuizSerializer
)
from rest_framework.parsers import (
    MultiPartParser,
    FormParser
)


class AdminCourseView(APIView):

    # GET COURSES
    def get(self, request):

        courses = Course.objects.all().order_by("-id")

        serializer = CourseSerializer(
            courses,
            many=True
        )

        return Response(serializer.data)

    # CREATE COURSE
    def post(self, request):

        serializer = CourseSerializer(
        data=request.data
        )

        if serializer.is_valid():

            course = serializer.save()

            mentor_ids = request.data.getlist(
                "mentors"
            )

        if mentor_ids:

            course.mentors.set(
                mentor_ids
            )

        return Response(
            CourseSerializer(course).data,
            status=status.HTTP_201_CREATED
        )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
        
class CourseDetailView(APIView):

    def get(self, request, id):

        course = get_object_or_404(
            Course,
            id=id
        )

        serializer = CourseSerializer(
            course
        )

        return Response(serializer.data)
class SessionCreateView(APIView):

    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    def post(self, request):

        serializer = SessionSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )
class QuizCreateView(APIView):

    def post(self, request):

        serializer = QuizSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=201
            )

        print(serializer.errors)

        return Response(
            serializer.errors,
            status=400
        )
        
class CourseSessionsView(APIView):

    def get(self, request, id):

        sessions = Session.objects.filter(
            course_id=id
        ).order_by("id")

        serializer = SessionSerializer(
            sessions,
            many=True
        )

        return Response(serializer.data)
    
class AllSessionsView(APIView):

    def get(self, request):

        sessions = Session.objects.all().order_by("-id")

        serializer = SessionSerializer(
            sessions,
            many=True
        )

        return Response(serializer.data)
    
class SessionDetailView(APIView):

    def get(self, request, id):

        session = get_object_or_404(
            Session,
            id=id
        )

        serializer = SessionSerializer(
            session
        )

        return Response(serializer.data)
    
class CourseStatisticsView(APIView):

    def get(self, request, id):

        course = get_object_or_404(
            Course,
            id=id
        )

        total_students = course.enrollments.count()

        completed_students = (
            course.enrollments.filter(
                completed=True
            ).count()
        )

        active_students = (
            total_students -
            completed_students
        )

        return Response({

            "total_students":
            total_students,

            "active_students":
            active_students,

            "completed_students":
            completed_students,

            "total_sessions":
            course.sessions.count()
        })
        
class CourseLearnersView(APIView):

    def get(self, request, id):

        enrollments = Enrollment.objects.filter(
            course_id=id
        )

        data = []

        for item in enrollments:

            data.append({

                "id":
                item.learner.id,

                "name":
                item.learner.full_name,

                "email":
                item.learner.email,

                "progress":
                item.progress,

                "completed":
                item.completed
            })

        return Response(data)
    
class MentorDetailView(APIView):

    def get(self, request, id):

        mentor = get_object_or_404(
            MentorProfile,
            id=id
        )

        return Response({

            "id": mentor.id,

            "name":
            mentor.user.full_name,

            "email":
            mentor.user.email,

            "phone":
            mentor.phone,

            "expertise":
            mentor.primary_expertise,

            "experience":
            mentor.years_of_experience,

            "bio":
            mentor.bio
        })
        
class UpdateCourseView(APIView):

    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    def put(self, request, id):

        course = get_object_or_404(
            Course,
            id=id
        )

        serializer = CourseSerializer(
            course,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )
        
class DeleteCourseView(APIView):

    def delete(self, request, id):

        course = get_object_or_404(
            Course,
            id=id
        )

        course.delete()

        return Response({
            "message": "Course deleted"
        })
        
class UpdateSessionView(generics.UpdateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def update(self, request, *args, **kwargs):
        print(request.data)
        return super().update(request, *args, **kwargs)
    
class DeleteSessionView(APIView):

    def delete(self, request, id):

        session = get_object_or_404(
            Session,
            id=id
        )

        session.delete()

        return Response({
            "message": "Session deleted"
        })

