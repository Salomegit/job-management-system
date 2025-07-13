from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    model = Job
    fields = [
            'id', 'title', 'description', 'company_name', 
            'location', 'salary', 'status', 'created_at', 'updated_at'
        ]
    read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_salary(self, value):
        if value < 0:
            raise serializers.ValidationError("Salary must be a positive number.")
        return value  
    
class JobCreateSerializer(JobSerializer):
    class Meta(JobSerializer.Meta):
        fields = [
            'title', 'description', 'company_name', 
            'location', 'salary'
        ]

class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company_name', 'location', 
            'salary', 'status', 'created_at'
        ] 
    