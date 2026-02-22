from django.urls import path
from .views import register_view
from .views import LearnerLoginView
from .views import GoogleLoginView


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
]
