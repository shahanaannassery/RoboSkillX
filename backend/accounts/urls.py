from django.urls import path
from .views import register_view
from .views import LearnerLoginView

urlpatterns = [
    path("learner/register/", register_view, name="learner-register"),
    path("learner/login/", LearnerLoginView.as_view(), name="learner-login"),
]
