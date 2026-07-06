from django.urls import path
from .views import LearnerCourseDetailView, LearnerCourseEnrollView, LearnerCourseListView, LearnerOnboardingView, LearnerQuizView, LearnerSessionDetailView, MarkSessionCompleteView

urlpatterns = [
    path("onboarding/", LearnerOnboardingView.as_view(), name="learner-onboarding"),
    path("courses/", LearnerCourseListView.as_view(), name="learner-course-list"),
    path("courses/<int:course_id>/",LearnerCourseDetailView.as_view()),
    

    path("sessions/<int:id>/", LearnerSessionDetailView.as_view()),
    path( "sessions/<int:session_id>/quiz/",LearnerQuizView.as_view()),
    path("sessions/<int:id>/complete/",MarkSessionCompleteView.as_view()),
 
    # Enroll              
    path("courses/<int:course_id>/enroll/", LearnerCourseEnrollView.as_view(), name="learner-enroll"),
]
