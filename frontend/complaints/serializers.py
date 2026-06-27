from rest_framework import serializers

class ComplaintSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    description = serializers.CharField()
    category = serializers.CharField(max_length=100)
    user_email = serializers.EmailField()