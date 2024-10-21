from django.contrib import admin
from django.urls import path, include, re_path as url

urlpatterns = [
    path("admin/", admin.site.urls),
    url(r"^api/", include("financegoals.urls")),
]
