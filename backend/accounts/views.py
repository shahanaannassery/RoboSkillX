from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from .serializers import LearnerLoginSerializer
from rest_framework.views import APIView
from rest_framework import status
from .serializers import (
    ForgotPasswordSerializer,
    VerifyOTPSerializer,
    ResetPasswordSerializer,
)
from .serializers import GoogleLoginSerializer
from .serializers import MentorRegisterSerializer
from .serializers import MentorLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import AdminForgotPasswordSerializer
from .serializers import  AdminVerifyOTPSerializer
from .serializers import AdminResetPasswordSerializer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated


@api_view(["POST"])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=201)

    return Response(serializer.errors, status=400)


class LearnerLoginView(APIView):

    def post(self, request):

        serializer = LearnerLoginSerializer(data=request.data)

        if serializer.is_valid():

            data = serializer.validated_data

            access = data["access"]
            refresh = data["refresh"]

            response = Response(
                {
                    "status": "success",
                    "message": "Login successful",
                    "user": data["user"],
                    "onboarding_completed": data["onboarding_completed"]
                }
            )

            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                secure=False,
                samesite="Lax",
                path="/"
            )

            response.set_cookie(
                key="refresh_token",
                value=refresh,
                httponly=True,
                secure=False,
                samesite="Lax",
                path="/"
            )

            return response

        return Response(serializer.errors, status=400)
class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=200)
        return Response(serializer.errors, status=400)


class VerifyOTPView(APIView):
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=200)
        return Response(serializer.errors, status=400)


class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=200)
        return Response(serializer.errors, status=400)


class GoogleLoginView(APIView):
    permission_classes = []

    def post(self, request):

        serializer = GoogleLoginSerializer(data=request.data)

        if serializer.is_valid():

            data = serializer.validated_data

            access = data["access"]
            refresh = data["refresh"]
            user = data["user"]

            response = Response({
                "success": True,
                "user": user,
                "onboarding_completed": user["onboarding_completed"],
                "is_approved": user["is_approved"],
            })

            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                secure=False,
                samesite="Lax"
            )

            response.set_cookie(
                key="refresh_token",
                value=refresh,
                httponly=True,
                secure=False,
                samesite="Lax"
            )

            return response

        return Response(serializer.errors, status=400)

class MentorRegisterView(APIView):

    def post(self, request):
        serializer = MentorRegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class MentorLoginView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):

        serializer = MentorLoginSerializer(data=request.data)

        if serializer.is_valid():

            data = serializer.validated_data["data"]

            access = data["access"]
            refresh = data["refresh"]

            response = Response(
                {
                    "success": True,
                    "user": data["user"],
                    "onboarding_completed": data["onboarding_completed"],
                    "is_approved": data["is_approved"],
                },
                status=200
            )

            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                secure=False,
                samesite="Lax"
            )

            response.set_cookie(
                key="refresh_token",
                value=refresh,
                httponly=True,
                secure=False,
                samesite="Lax"
            )

            return response

        return Response(serializer.errors, status=400)

class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        if user.role != "admin":
            return Response({"error": "Access denied"}, status=403)

        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        response = Response(
            {
                "success": True,
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "full_name": user.full_name,
                    "role": user.role,
                }
            }
        )

        response.set_cookie(
            key="access_token",
            value=access,
            httponly=True,
            secure=False,
            samesite="Lax"
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax"
        )

        return response
class AdminForgotPasswordView(APIView):
    def post(self, request):
        serializer = AdminForgotPasswordSerializer(data=request.data)

        if serializer.is_valid():
            return Response(serializer.validated_data, status=200)

        return Response(serializer.errors, status=400)
    
class AdminVerifyOTPView(APIView):
    def post(self, request):
        serializer = AdminVerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=200)
        return Response(serializer.errors, status=400)


class AdminResetPasswordView(APIView):
    def post(self, request):
        serializer = AdminResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=200)
        return Response(serializer.errors, status=400)
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()

        response = Response({"message": "Logged out successfully"})

        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        return response
    
