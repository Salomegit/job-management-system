from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone

class  Job(models.Model):
    STATUS_CHOICES = [
         ('active', 'Active'),
        ('inactive', 'Inactive')]
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField( null=True, blank=True)
    company_name = models.CharField(max_length=200, default='Unknown Company')
    location = models.CharField(max_length=200,  null=False, blank=False)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, validators=[MinValueValidator(0)])
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Meta:
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'
        ordering = ['-created_at']
        
def __str__(self):
    return f"{self.title} at {self.company_name}"
    
def soft_delete(self):
    self.status = 'inactive'
    self.save()
    return self
    
