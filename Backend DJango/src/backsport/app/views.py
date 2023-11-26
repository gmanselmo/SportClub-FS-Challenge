import json
from django.views import View
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.db.models import Q
from datetime import datetime
from .models import Customer


# Create your views here.

class CustomerView(View):
    
    """
        Customer View related to read and persist customers on the db.
    """
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):

        """ 
            Prevent to require a csrf token during testing time.    
        """

        return super().dispatch(request, *args, **kwargs)
    

    def get(self, request, id=0, *args, **kwargs):
        
        """
            Handles GET requests for customer information.

            Args:
                request (HttpRequest): HTTP client request object.
                id (int, optional): Customer's DNI. Defaults to 0.
                *args: Variable length argument list.
                **kwargs: Arbitrary keyword arguments.

            Returns:
                JsonResponse: JSON with the found customer(s) and a success message or an error message if not found.

            Raises:
                IndexError: If the customer is not found.
                Exception: If an unexpected error occurs during the process.
        """

        # Capture query parameters from the URL
        search_field = request.GET.get('field', '')
        gba_param = request.GET.get('gba', '')
        min_date = request.GET.get('minDate', '')
        max_date = request.GET.get('maxDate', '')

        try:
            # Check if 'search_field' is provided
            if search_field:
                # Split 'search_field' into names
                names = search_field.split()

                # Check if there are two parts (name and lastname)
                if len(names) == 2:
                    # Perform a combined search
                    customers = Customer.objects.filter(
                        Q(name__icontains=names[0]) & Q(lastname__icontains=names[1])
                    ).values()
                else:
                    # Perform a search by name or lastname
                    customers = Customer.objects.filter(
                        Q(name__icontains=search_field) | Q(lastname__icontains=search_field)
                    ).values()

            # Check if 'id' is provided
            elif id > 0:
                # Perform a search by DNI
                customers = Customer.objects.filter(dni=id).values()

            # If neither 'search_field' nor 'id' is provided, get all customers
            else:
                customers = Customer.objects.values()

            # Filter by 'isGBA' if 'gba_param' is provided
            if gba_param is not None and gba_param.lower() == 'true':
                customers = customers.filter(isGBA=True)

            # Convert date strings to datetime objects and filter by birth date range
            if min_date:
                min_date = datetime.strptime(min_date, '%Y-%m-%d')
                customers = customers.filter(birth_date__gte=min_date)

            if max_date:
                max_date = datetime.strptime(max_date, '%Y-%m-%d')
                customers = customers.filter(birth_date__lte=max_date)

            # Check if customers are found
            if customers:
                response = {'message': 'Success', 'customers': list(customers)}
            else:
                response = {'message': 'Customers not found...'}

            return JsonResponse(response)

        # Handle specific exceptions
        except IndexError:
            response = {'message': 'Customer was not found...'}
            return JsonResponse(response, status=404)

        except Exception as e:
            # Handle unexpected errors
            response = {'message': f'An unexpected error occurred: {str(e)}'}
            return JsonResponse(response, status=500)



    def post(self, request):

        """
            Creates a new customer based on the provided client request.

            Args:
                request (HttpRequest): The HTTP client request object.

            Returns:
                JsonResponse: A JSON response with a success message if the customer is created successfully,
                            or an error message with an appropriate status code if there are issues.
        """

        try:
            # Parse JSON data from the request body
            jsonData = json.loads(request.body)

            # Define required fields for customer creation
            required_fields = ['dni', 'name', 'lastname', 'birth_date', 'isGBA']

            # Check if all required fields are present in the JSON data
            for field in required_fields:
                if field not in jsonData:
                    response = {'message': f'Missing required field: {field}'}
                    return JsonResponse(response, status=400)

            # Create a new customer with the provided data
            Customer.objects.create(
                dni=jsonData['dni'],
                name=jsonData['name'],
                lastname=jsonData['lastname'],
                birth_date=jsonData['birth_date'],
                isGBA=jsonData['isGBA']
            )

            response = {'message': 'Success'}
            return JsonResponse(response)

        except json.JSONDecodeError:
            # Handle JSON decoding error
            response = {'message': 'Invalid JSON format in the request body'}
            return JsonResponse(response, status=400)

        except Exception as e:
            # Handle unexpected errors
            response = {'message': f'An unexpected error occurred: {str(e)}'}
            return JsonResponse(response, status=500)


    def put(self, request, id):
        """
        Updates a customer's information based on the provided client request.

        Args:
            request (HttpRequest): The HTTP client request object.
            id (int): The DNI of the customer to be updated.

        Returns:
            JsonResponse: A JSON response with a success message if the customer is updated successfully,
                        or an error message with an appropriate status code if there are issues.

        Raises:
            JSONDecodeError: If there is an issue decoding the JSON format in the request body.
            Http404: If the customer with the provided DNI is not found.
            Exception: If an unexpected error occurs during the update process.
        """
        try:
            # Parse JSON data from the request body
            jsonData = json.loads(request.body)

            # Retrieve the customer with the provided DNI
            customer = Customer.objects.filter(dni=id)
            if customer.exists():
                # Define required fields for customer update
                required_fields = ['name', 'lastname', 'birth_date', 'isGBA']

                # Check if all required fields are present in the JSON data
                missing_fields = [field for field in required_fields if field not in jsonData]
                if missing_fields:
                    response = {'message': f'Missing required fields: {", ".join(missing_fields)}'}
                    return JsonResponse(response, status=400)

                # Update the customer's information
                updated_customer = customer.first()
                updated_customer.name = jsonData['name']
                updated_customer.lastname = jsonData['lastname']
                updated_customer.birth_date = jsonData['birth_date']
                updated_customer.isGBA = jsonData['isGBA']
                updated_customer.save()

                response = {'message': 'Success'}
            else:
                response = {'message': 'Customer not found...'}
                return JsonResponse(response, status=404)

            return JsonResponse(response)

        except json.JSONDecodeError:
            # Handle JSON decoding error
            response = {'message': 'Invalid JSON format in the request body'}
            return JsonResponse(response, status=400)

        except Exception as e:
            # Handle unexpected errors
            response = {'message': f'An unexpected error occurred: {str(e)}'}
            return JsonResponse(response, status=500)


    def delete(self, request, id):

        """
            Deletes a customer based on the provided client request.

            Args:
                request (HttpRequest): The HTTP client request object.
                id (int): The DNI of the customer to be deleted.

            Returns:
                JsonResponse: A JSON response with a success message if the customer is deleted successfully,
                            or an error message if the customer is not found.

            Raises:
                Http404: If the customer with the provided ID is not found.
                Exception: If an unexpected error occurs during the deletion process.
        """

        try:
            # Retrieve the customer with the provided DNI
            customer = Customer.objects.filter(dni=id)

            if customer.exists():
                # Delete the customer
                customer.delete()

                response = {'message': 'Success'}
            else:
                response = {'message': 'Customer not found...'}

            return JsonResponse(response)

        except Http404:
            # Handle the case where the customer is not found
            response = {'message': 'Customer not found...'}
            return JsonResponse(response, status=404)

        except Exception as e:
            # Handle unexpected errors
            response = {'message': f'An unexpected error occurred: {str(e)}'}
            return JsonResponse(response, status=500)
