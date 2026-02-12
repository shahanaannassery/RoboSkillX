from django.db import models
from accounts.models import User


class MentorProfile(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    EXPERIENCE_CHOICES = [
        ("0_1", "0-1 years"),
        ("1_3", "1-3 years"),
        ("3_5", "3-5 years"),
        ("5_plus", "5+ years"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Basic info
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    # Expertise
    primary_expertise = models.CharField(max_length=100)
    skills = models.JSONField(default=list, blank=True)

    # Experience
    years_of_experience = models.CharField(max_length=10, choices=EXPERIENCE_CHOICES)
    bio = models.TextField(blank=True)

    # Documents
    resume = models.FileField(upload_to="mentor/resumes/")
    certificates = models.FileField(upload_to="mentor/certificates/", blank=True, null=True)
    portfolio_url = models.URLField(blank=True)

    # Approval system
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    rejection_reason = models.TextField(blank=True)

    # Flags
    profile_completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.status}"
