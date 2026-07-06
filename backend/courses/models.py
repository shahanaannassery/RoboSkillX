from django.db import models

from mentors.models import MentorProfile
from accounts.models import User
from mentors.models import MentorProfile

class Course(models.Model):

    LEVEL_CHOICES = (
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced"),
    )

    STATUS_CHOICES = (
        ("Draft", "Draft"),
        ("Published", "Published"),
    )

    title = models.CharField(max_length=255)

    description = models.TextField()

    level = models.CharField(
        max_length=20,
        choices=LEVEL_CHOICES
    )

    thumbnail = models.ImageField(
        upload_to="course_thumbnails/",
        blank=True,
        null=True
    )

    duration = models.CharField(max_length=100)

    total_sessions = models.IntegerField()

    mentors = models.ManyToManyField(
        MentorProfile,
        blank=True
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Draft"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title
    
class Session(models.Model):

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="sessions"
    )
    
    mentor = models.ForeignKey(
        MentorProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="sessions"
    )

    title = models.CharField(
        max_length=255
    )

    description = models.TextField()

    duration = models.CharField(
        max_length=100
    )

    video = models.FileField(
        upload_to="session_videos/",
        blank=True,
        null=True
    )

    materials = models.FileField(
        upload_to="session_materials/",
        blank=True,
        null=True
    )

    circuit_diagram = models.ImageField(
        upload_to="circuit_diagrams/",
        blank=True,
        null=True
    )

    project_title = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    project_description = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.title
    
class Quiz(models.Model):

    ANSWER_CHOICES = [
        ("A", "A"),
        ("B", "B"),
        ("C", "C"),
        ("D", "D"),
    ]

    session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE,
        related_name="quizzes"
    )

    question = models.TextField()

    option_a = models.CharField(
        max_length=255
    )

    option_b = models.CharField(
        max_length=255
    )

    option_c = models.CharField(
        max_length=255
    )

    option_d = models.CharField(
        max_length=255
    )

    correct_answer = models.CharField(
        max_length=1,
        choices=ANSWER_CHOICES
    )

    def __str__(self):

        return self.question
    
class Enrollment(models.Model):

    learner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="enrollments"
    )

    progress = models.IntegerField(
        default=0
    )

    enrolled_at = models.DateTimeField(
        auto_now_add=True
    )

    completed = models.BooleanField(
        default=False
    )

    def __str__(self):
        return f"{self.learner.email} - {self.course.title}"
    
class SessionProgress(models.Model):

    learner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE
    )

    completed = models.BooleanField(
        default=False
    )

    completed_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.learner.email} - {self.session.title}"