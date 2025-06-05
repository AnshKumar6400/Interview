from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
# # router.register(r'project', ProjectViewSet, basename='project')
router.register(r'apartments', ApartmentsViewSet, basename='apartments')
urlpatterns = [
    path('', include(router.urls)),  # Includes /project/, /project/<id>/ etc.
]
