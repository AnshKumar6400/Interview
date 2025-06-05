from django.db import models
from django.core.exceptions import ValidationError
from django.db.models import Max
from datetime import date

from django.db import models
from django.core.exceptions import ValidationError
from django.db.models import Sum, Max,Count,Avg,Min
from datetime import date

class Apartments(models.Model):
    name = models.CharField()
    city=models.CharField()
    Rent =  models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Bedroom=models.IntegerField(max_length=20)
    Posted=models.DateField()
    city=models.CharField(max_length=100)


    def clean(self):
        super().clean()

        # Backdated entries not allowed
        if self.date < date.today():
            raise ValidationError({'date': 'Backdated invoices are not allowed.'})

        # At least one item should exist
        if self.pk and not self.items.exists():
            raise ValidationError('At least one invoice item is required.')
       



    def __str__(self):
        return f"Invoice #{self.invoiceNumber} - {self.customerName}"


    