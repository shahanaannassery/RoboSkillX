from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import MentorProfile
from .serializers import MentorProfileSerializer
from .models import MentorProfile, MentorCertificate
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# =========================
# APPROVE MENTOR
# =========================
@api_view(["PATCH"])
def approve_mentor(request, pk):
    try:
        mentor = MentorProfile.objects.get(id=pk)

        mentor.status = "approved"
        mentor.save()

        # 🔥 Update user approval status
        mentor.user.is_approved = True
        mentor.user.save()

        return Response(
            {"message": "Mentor approved successfully"},
            status=status.HTTP_200_OK
        )

    except MentorProfile.DoesNotExist:
        return Response(
            {"error": "Mentor not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# =========================
# REJECT MENTOR
# =========================
@api_view(["PATCH"])
def reject_mentor(request, pk):
    try:
        mentor = MentorProfile.objects.get(id=pk)

        reason = request.data.get("reason", "")
        mentor.status = "rejected"
        mentor.rejection_reason = reason
        mentor.save()

        return Response(
            {"message": "Mentor rejected successfully"},
            status=status.HTTP_200_OK
        )

    except MentorProfile.DoesNotExist:
        return Response(
            {"error": "Mentor not found"},
            status=status.HTTP_404_NOT_FOUND
        )
        

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mentor_profile_setup(request):
    user = request.user

    mentor, created = MentorProfile.objects.get_or_create(user=user)

    mentor.phone = request.data.get("phone")
    mentor.primary_expertise = request.data.get("primary_expertise")
    mentor.years_of_experience = request.data.get("years_of_experience")
    mentor.bio = request.data.get("bio")
    mentor.portfolio_url = request.data.get("portfolio_url")
    mentor.skills = request.data.getlist("skills")
    mentor.resume = request.FILES.get("resume")
    mentor.status = "pending"

    mentor.save()

    # IMPORTANT
    user.onboarding_completed = True
    user.save()

    return Response({"message": "Profile submitted"})

@api_view(["GET"])
def mentor_status(request):
    try:
        mentor = MentorProfile.objects.get(user=request.user)

        return Response({
            "status": mentor.status,
            "rejection_reason": mentor.rejection_reason
        })

    except MentorProfile.DoesNotExist:
        return Response({
            "status": "not_submitted",
            "rejection_reason": ""
        })
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def pending_mentors(request):
    mentors = MentorProfile.objects.all().order_by("-created_at")
    serializer = MentorProfileSerializer(mentors, many=True)
    return Response(serializer.data)