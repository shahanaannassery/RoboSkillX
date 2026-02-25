from django.urls import path
from .views import pending_mentors, approve_mentor, reject_mentor,mentor_profile_setup, mentor_status

urlpatterns = [
    # path("admin/pending-mentors/", pending_mentors),
    # path("admin/approve-mentor/<int:pk>/", approve_mentor),
    # path("admin/reject-mentor/<int:pk>/", reject_mentor),
    path("profile-setup/", mentor_profile_setup),
    path("my-status/", mentor_status),
    path("pending-mentors/", pending_mentors),
    path("approve-mentor/<int:pk>/", approve_mentor),
    path("reject-mentor/<int:pk>/", reject_mentor),
   
]