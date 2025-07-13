from django.contrib import admin
from .models import Job
# Register your models here.

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'company_name', 'location', 'salary', 'status', 'created_at']
    search_fields = ['title', 'company_name', 'location']
    # list_filter = ['status']
    # ordering = ['created_at']
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        (
            'Job Details',
            {
                'fields': ('title', 'description', 'company_name', 'location', 'salary', 'status')
            }
        ),
    
        (
            'Timestamps',
            {
                'fields': ('created_at', 'updated_at'),
                'classes': ('collapse',)
            }
        )
        
    )
