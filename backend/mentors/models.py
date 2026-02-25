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

    phone = models.CharField(max_length=20)

    primary_expertise = models.CharField(max_length=100)
    skills = models.JSONField(default=list, blank=True)

    years_of_experience = models.CharField(
        max_length=10,
        choices=EXPERIENCE_CHOICES
    )

    bio = models.TextField(blank=True)

    resume = models.FileField(upload_to="mentor/resumes/")

    portfolio_url = models.URLField(blank=True)

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="pending"
    )

    rejection_reason = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.status}"


class MentorCertificate(models.Model):
    mentor = models.ForeignKey(
        MentorProfile,
        on_delete=models.CASCADE,
        related_name="certificates"
    )
    file = models.FileField(upload_to="mentor/certificates/")