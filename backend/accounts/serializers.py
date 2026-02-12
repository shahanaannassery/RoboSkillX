from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from learners.models import LearnerProfile

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["full_name", "email", "password", "confirm_password"]

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        user = User.objects.create_user(
            email=validated_data["email"],
            full_name=validated_data["full_name"],
            password=validated_data["password"],
            role="learner",
        )
        return user
    
class LearnerLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(username=email, password=password)
        
       


        if not user:
            raise serializers.ValidationError("Invalid email or password")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled")

        refresh = RefreshToken.for_user(user)
        
        try:
            profile = LearnerProfile.objects.get(user=user)
            onboarding_done = profile.onboarding_completed
        except LearnerProfile.DoesNotExist:
            onboarding_done = False

        return {
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name, 
                "role": user.role,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "onboarding_completed": onboarding_done,
        }
