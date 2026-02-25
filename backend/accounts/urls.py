from django.urls import path
from .views import register_view
from .views import LearnerLoginView
from .views import GoogleLoginView
from .views import MentorRegisterView, MentorLoginView
from .views import AdminLoginView
from .views import AdminForgotPasswordView
from .views import AdminVerifyOTPView
from .views import AdminResetPasswordView

from django.urls import path
from .views import (
    ForgotPasswordView,
    VerifyOTPView,
    ResetPasswordView,
)

urlpatterns = [
    path("learner/register/", register_view, name="learner-register"),
    path("learner/login/", LearnerLoginView.as_view(), name="learner-login"),
    path("forgot-password/", ForgotPasswordView.as_view()),
    path("verify-otp/", VerifyOTPView.as_view()),
    path("reset-password/", ResetPasswordView.as_view()),
    path("google-login/", GoogleLoginView.as_view()),
    path("mentor/register/", MentorRegisterView.as_view(), name="mentor-register"),
    path("mentor/login/", MentorLoginView.as_view(), name="mentor-login"),
    path("admin/login/", AdminLoginView.as_view(), name="admin-login"),
    path("admin/forgot-password/", AdminForgotPasswordView.as_view()),
    path("admin/verify-otp/", AdminVerifyOTPView.as_view()),
    path("admin/reset-password/", AdminResetPasswordView.as_view()),
]
