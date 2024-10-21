from rest_framework import serializers
from financegoals.models import Financegoal


class FinancegoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Financegoal
        fields = ["id", "text", "completed", "created_at"]
