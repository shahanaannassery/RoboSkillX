from django.urls import path
from .views import *
from .views import CourseStatisticsView, CourseLearnersView, MentorDetailView

urlpatterns = [
    path("admin/courses/", AdminCourseView.as_view()),
    path("admin/courses/<int:id>/", CourseDetailView.as_view()),
    path("admin/sessions/", SessionCreateView.as_view()),
    path("admin/quizzes/", QuizCreateView.as_view()),
    path("admin/courses/<int:id>/sessions/", CourseSessionsView.as_view()),
    path("admin/all-sessions/", AllSessionsView.as_view()),
    path("admin/sessions/<int:id>/", SessionDetailView.as_view()),
    path("courses/<int:id>/statistics/", CourseStatisticsView.as_view()),
    path("courses/<int:id>/learners/", CourseLearnersView.as_view()),
    path("mentor/<int:id>/", MentorDetailView.as_view()),
    path("admin/courses/<int:id>/update/", UpdateCourseView.as_view()),
    path("admin/courses/<int:id>/delete/", DeleteCourseView.as_view()),
    path("admin/sessions/<int:pk>/update/", UpdateSessionView.as_view(), name="update-session"),
    path("admin/sessions/<int:id>/delete/",DeleteSessionView.as_view()),
    ]