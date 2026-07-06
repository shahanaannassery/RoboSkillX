from rest_framework import serializers
from .models import MentorSession


class MentorSessionSerializer(serializers.ModelSerializer):

    learner_name = serializers.CharField(
        source="learner.user.full_name",
        read_only=True
    )

    session_title = serializers.CharField(
        source="course_session.title",
        read_only=True
    )

    class Meta:
        model = MentorSession
        fields = "__all__"