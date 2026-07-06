

from django.urls import path
from .views import MentorMySessionsView

urlpatterns = [
    path(
        "my-sessions/",
        MentorMySessionsView.as_view()
    ),
]