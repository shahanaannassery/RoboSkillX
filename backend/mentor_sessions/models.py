from django.db import models

# Create your models here.
# mentor_sessions


from mentors.models import MentorProfile
from learners.models import LearnerProfile
from courses.models import Session


class MentorSession(models.Model):

    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    )

    mentor = models.ForeignKey(
        MentorProfile,
        on_delete=models.CASCADE
    )

    learner = models.ForeignKey(
        LearnerProfile,
        on_delete=models.CASCADE
    )

    course_session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE
    )

    scheduled_date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    meeting_link = models.URLField(
        blank=True,
        null=True
    )

    notes = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.learner.user.full_name}"
            f" - {self.course_session.title}"
        )