from django.db import models
from accounts.models import User


class LearnerProfile(models.Model):
    SKILL_LEVEL_CHOICES = [
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("advanced", "Advanced"),
    ]

    AGE_GROUP_CHOICES = [
        ("under_13", "Under 13"),
        ("13_18", "13–18"),
        ("18_25", "18–25"),
        ("25_plus", "25+"),
    ]

    INTEREST_CHOICES = [
        ("robotics", "Robotics"),
        ("electronics", "Electronics"),
        ("circuit_design", "Circuit Design"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    age_group = models.CharField(max_length=20, choices=AGE_GROUP_CHOICES)
    skill_level = models.CharField(max_length=20, choices=SKILL_LEVEL_CHOICES)

   
    interests = models.JSONField(default=list, blank=True)

    uses_laptop = models.BooleanField(default=False)
    uses_mobile = models.BooleanField(default=False)

    has_hardware_kit = models.BooleanField(default=False)

    onboarding_completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - Learner Profile"
