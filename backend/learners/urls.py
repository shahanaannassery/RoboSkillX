from django.urls import path
from .views import LearnerOnboardingView

urlpatterns = [
    path("onboarding/", LearnerOnboardingView.as_view(), name="learner-onboarding"),
]
