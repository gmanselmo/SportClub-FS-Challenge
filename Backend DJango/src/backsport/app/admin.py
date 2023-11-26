from django.contrib import admin

# Register your models here.
from .models import Customer

# Show Model on Django Admin Panel: url:port/admin
admin.site.register(Customer)