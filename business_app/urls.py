from django.urls import re_path
from .views import BrockerOfficeViewSet, spa
from rest_framework.routers import SimpleRouter

router = SimpleRouter(trailing_slash=False)
router.register("api/brocker-office", BrockerOfficeViewSet, basename="brocker-office")

urlpatterns = router.urls + [
    re_path(r"^.*$", spa),
]
