from django.urls import path
from .views import CustomerView

urlpatterns = [
    # List all customers or search with optional query parameters
    path('customers/', CustomerView.as_view(), name="customers"),

    # Get, update, or delete a specific customer by DNI
    path('customers/<int:id>/', CustomerView.as_view(), name="customer_id"),

    # Search customers with query parameters
    path('customers/search/', CustomerView.as_view(), name="customer_search"),
]
