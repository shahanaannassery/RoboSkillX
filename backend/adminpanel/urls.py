from django.urls import path
from .views import admin_users_list

urlpatterns = [
    path("users/", admin_users_list),
]