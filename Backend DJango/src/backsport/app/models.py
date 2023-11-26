from django.db import models

# Create your models here.
class Customer(models.Model):

    """
        Customer model with its atributes.
    """

    dni = models.IntegerField(primary_key=True, unique=True)
    name = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    birth_date = models.DateField()
    isGBA = models.BooleanField()
