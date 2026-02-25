from rest_framework import serializers
from .models import MentorProfile, MentorCertificate


class MentorCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorCertificate
        fields = ["id", "file"]


class MentorProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    experience = serializers.CharField(
        source="get_years_of_experience_display",
        read_only=True
    )
    applied_date = serializers.DateTimeField(
        source="created_at",
        format="%b %d, %Y",
        read_only=True
    )

    certificates = MentorCertificateSerializer(many=True, read_only=True)

    class Meta:
        model = MentorProfile
        fields = [
            "id",
            "name",
            "email",
            "primary_expertise",
            "skills",                # ✅ added
            "experience",
            "bio",                   # ✅ added
            "resume",                # ✅ added
            "portfolio_url",         # ✅ added
            "certificates",          # ✅ added
            "applied_date",
            "status",
        ]