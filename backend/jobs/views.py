from django.shortcuts import render
from models import Job
from rest_framework import viewsets
from serializers import JobSerializer, JobCreateSerializer, JobListSerializer
