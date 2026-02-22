from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from learners.models import LearnerProfile
import random
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from .models import OTP
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings

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
        


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        email = data.get("email")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Email not registered")

        otp_code = str(random.randint(100000, 999999))

        OTP.objects.create(user=user, code=otp_code)

        send_mail(
            subject="RoboSkillX Password Reset OTP",
            message=f"Your OTP is {otp_code}. It is valid for 10 minutes.",
            from_email="yourgmail@gmail.com",
            recipient_list=[email],
        )

        return {"message": "OTP sent successfully"}


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()

    def validate(self, data):
        email = data.get("email")
        otp = data.get("otp")

        try:
            user = User.objects.get(email=email)
            otp_obj = OTP.objects.filter(user=user, code=otp).latest("created_at")
        except:
            raise serializers.ValidationError("Invalid OTP")

        if otp_obj.is_expired():
            raise serializers.ValidationError("OTP expired")

        return {"message": "OTP verified"}


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()
    new_password = serializers.CharField()
    confirm_password = serializers.CharField()

    def validate(self, data):
        if data["new_password"] != data["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match")

        try:
            user = User.objects.get(email=data["email"])
            otp_obj = OTP.objects.filter(
                user=user, code=data["otp"]
            ).latest("created_at")
        except:
            raise serializers.ValidationError("Invalid OTP")

        if otp_obj.is_expired():
            raise serializers.ValidationError("OTP expired")

        user.set_password(data["new_password"])
        user.save()

        otp_obj.delete()

        return {"message": "Password reset successful"}
    

class GoogleLoginSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, data):
        token = data.get("token")

        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                "182754324401-cg2ac8vrbe1sdj649nf39sprjf6utc0a.apps.googleusercontent.com"
            )

            email = idinfo["email"]
            full_name = idinfo.get("name", "")

        except ValueError:
            raise serializers.ValidationError("Invalid Google token")

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "full_name": full_name,
                "role": "learner",
            },
        )

        refresh = RefreshToken.for_user(user)

        return {
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }