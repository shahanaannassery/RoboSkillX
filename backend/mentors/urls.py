from django.urls import path
from .views import approved_mentors, pending_mentors, approve_mentor, reject_mentor,mentor_profile_setup, mentor_status
from .views import (MentorMySessionsView,)

urlpatterns = [
    
    path("profile-setup/", mentor_profile_setup),
    path("my-status/", mentor_status),
    path("pending-mentors/", pending_mentors),
    path("approve-mentor/<int:pk>/", approve_mentor),
    path("reject-mentor/<int:pk>/", reject_mentor),
    path("approved-mentors/", approved_mentors),
    path("my-sessions/",  MentorMySessionsView.as_view(),),
   
]