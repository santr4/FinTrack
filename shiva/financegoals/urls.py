# from django.urls import include, re_path as url, path
# from rest_framework.routers import DefaultRouter
# from . import views

# urlpatterns = [
#     url(r"add_financegoal/$", views.add_financegoal, name="add_financegoal"),
#     url(r"get_financegoal/$", views.get_financegoal, name="get_financegoal"),
#     url(r"delete_financegoal/$", views.delete_financegoal, name="delete_financegoal"),
# ]

from django.urls import path
from . import views

urlpatterns = [
    path("add_financegoal/", views.add_financegoal, name="add_financegoal"),
    path("get_financegoal/", views.get_financegoal, name="get_financegoal"),
    path(
        "delete_financegoal/<str:id>/",
        views.delete_financegoal,
        name="delete_financegoal",
    ),
    path("toggle_complete/<str:id>/", views.toggle_complete, name="toggle_complete"),
]
