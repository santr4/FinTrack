from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from financegoals.models import Financegoal
from financegoals.serializers import FinancegoalSerializer
from django.utils import timezone
import uuid
import json
import logging
import traceback

# @csrf_exempt
# def financegoal_list(request):
#     if request.method == "GET":
#         financegoals = Financegoal.objects.all()
#         serializer = FinancegoalSerializer(financegoals, many=True)
#         return JsonResponse(serializer.data, safe=False)

#     elif request.method == "POST":
#         data = JSONParser().parse(request)
#         serializer = FinancegoalSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)


# @csrf_exempt
# def financegoal_detail(request, pk):
#     try:
#         financegoal = Financegoal.objects.get(pk=pk)
#     except Financegoal.DoesNotExist:
#         return HttpResponse(status=404)
#     if request.method == "GET":
#         serializer = FinancegoalSerializer(financegoal)
#         return JsonResponse(serializer.data)
#     elif request.method == "PUT":
#         data = JSONParser().parse(request)
#         serializer = FinancegoalSerializer(financegoal, data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=400)
#     elif request.method == "DELETE":
#         financegoal.delete()
#         return HttpResponse(status=204)


@api_view(["POST"])
@csrf_exempt
def add_financegoal(request):
    try:
        req = request.data
        print("recieved data:", req)
        req["id"] = uuid.uuid4()
        req["created_at"] = timezone.now()
        serializer = FinancegoalSerializer(data=req)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"status": 201, "data": serializer.data})
        else:
            return JsonResponse({"status": 400, "data": serializer.errors})
    except Exception as e:
        logging.error(f"error in add_financialgoal:{e}")
        traceback.print_exc()
        return JsonResponse({"status": 500, "data": serializer.errors})


@api_view(["GET"])
@csrf_exempt
def get_financegoal(request):
    try:
        financegoal = Financegoal.objects.all()
        serializer = FinancegoalSerializer(financegoal, many=True)
        return JsonResponse({"status": 200, "data": serializer.data})
    except ValueError:
        return JsonResponse({"status": 500, "data": serializer.errors})


@api_view(["DELETE"])
@csrf_exempt
def delete_financegoal(request, id):
    print(f"Received ID: {id}")
    try:
        # Try to fetch the finance goal by ID and delete it
        financegoal = Financegoal.objects.get(id=id)
        financegoal.delete()
        return JsonResponse(
            {"status": 204, "data": "task deleted of id: {}".format(id)}
        )
    except Financegoal.DoesNotExist:
        return JsonResponse({"status": 404, "data": "financegoal not found"})
    except ValueError:
        return JsonResponse({"status": 500, "data": "Invalid request"})


@api_view(["PUT"])
@csrf_exempt
def toggle_complete(request, id):
    try:
        financegoal = Financegoal.objects.get(id=id)
        data = JSONParser().parse(request)

        # Toggle the completed status
        financegoal.completed = data.get("completed", financegoal.completed)
        financegoal.save()

        serializer = FinancegoalSerializer(financegoal)
        return JsonResponse({"status": 200, "data": serializer.data})
    except Financegoal.DoesNotExist:
        return JsonResponse({"status": 404, "data": "financegoal not found"})
    except Exception as e:
        return JsonResponse({"status": 500, "data": str(e)})
