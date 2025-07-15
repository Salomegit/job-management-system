from django.shortcuts import render
from .models import Job
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .serializers import JobSerializer, JobCreateSerializer, JobListSerializer


class JobListCreateView(generics.ListCreateAPIView):
    
    """Handles listing and creating jobs.
    """    
    def get_queryset(self):
        
        queryset = Job.objects.all()
        search = self.request.query_params.get('search')
        
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(company_name__icontains=search) | 
                Q(location__icontains=search)
            )


        return queryset
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return JobCreateSerializer
        return JobListSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        job = serializer.save()
        response_serializer = JobSerializer(job)

        return Response(
            {"message": "Job created successfully", "job":response_serializer.data},
            status=status.HTTP_201_CREATED
            )
        
class JobDetailView(generics.RetrieveUpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    
    def get_object(self):
        job_id = self.kwargs.get('pk')
        return get_object_or_404(Job, id=job_id)
    
    def update(self, request, *args, **kwargs):
        job = self.get_object()
        serializer = self.get_serializer(job, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        updated_job = serializer.save()
        
        return Response(
            {"message": "Job updated successfully", "job": JobSerializer(updated_job).data},
            status=status.HTTP_200_OK
        )
    
    def delete(self, request, *args, **kwargs):
        job = self.get_object()
        if job.status == 'inactive':
            return Response(
                {"error": "Job is already inactive"},
                status=status.HTTP_400_BAD_REQUEST
            ) 
        job.status = 'inactive'
        job.save()       
        return Response(
            {"message": "Job deleted successfully"},
            status=status.HTTP_200_OK        )
        
@api_view(['PATCH'])
def soft_delete_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    
    if job.status == 'inactive':
        return Response(
            {"error": "Job is already inactive"},
            status=status.HTTP_400_BAD_REQUEST
        )
    job.status = 'inactive'
    job.save()
    
    serializer = JobSerializer(job)
    return Response(
        {"message": "Job soft deleted successfully"},
        status=status.HTTP_200_OK
    )

@api_view(['GET'])
def job_stats(request):
    total_jobs = Job.objects.count()
    active_jobs = Job.objects.filter(status='active').count()
    inactive_jobs = Job.objects.filter(status='inactive').count()
    
    return Response({
        'total_jobs': total_jobs,
        'active_jobs': active_jobs,
        'inactive_jobs': inactive_jobs
    })
    
