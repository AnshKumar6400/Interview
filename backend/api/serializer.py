from rest_framework import serializers
from .models import *
# class InvoiceItemSerializer(serializers.ModelSerializer):
#     invoice = serializers.PrimaryKeyRelatedField(read_only=True)
#     class Meta:
#         model = InvoiceItem
#         fields = '__all__'
class ApartmentSerializer(serializers.ModelSerializer):
    apartment = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Apartments
        fields = '__all__'