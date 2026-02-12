from rest_framework import serializers
from .models import LearnerProfile


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
