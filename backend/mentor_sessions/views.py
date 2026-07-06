from django.shortcuts import render

# Create your views here.
# mentor_sessions/views.py

from rest_framework.generics import ListAPIView

from .models import MentorSession
from .serializers import MentorSessionSerializer

from mentors.models import MentorProfile


class MentorMySessionsView(ListAPIView):

    serializer_class = MentorSessionSerializer

    def get_queryset(self):

        mentor = MentorProfile.objects.get(
            user=self.request.user
        )

        return MentorSession.objects.filter(
            mentor=mentor
        ).order_by(
            "scheduled_date"
        )