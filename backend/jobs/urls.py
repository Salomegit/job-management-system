from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.JobListCreateView.as_view(), name='jobs-'),
    path('jobs/<int:pk>/', views.JobDetailView.as_view(), name='job-detail'),
    path('jobs/<int:pk>/delete/', views.soft_delete_job , name='job-deactivate'),
    path('jobs/stats/', views.job_stats, name='job-stats'),
]