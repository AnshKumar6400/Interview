from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from rest_framework.response import Response
from rest_framework import viewsets,permissions
from .serializer import *
# # # Create your views here.
class ApartmentsViewSet(viewsets.ModelViewSet):
    queryset = Apartments.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [permissions.AllowAny]