from django.shortcuts import render

# # Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import LearnerProfile
from .serializers import LearnerOnboardingSerializer


class LearnerOnboardingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        profile, created = LearnerProfile.objects.get_or_create(user=user)

        serializer = LearnerOnboardingSerializer(
            profile, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()

            # 🔥 UPDATE USER MODEL (IMPORTANT)
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

