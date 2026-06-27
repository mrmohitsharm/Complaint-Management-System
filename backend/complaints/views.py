from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ComplaintSerializer
from .services import complaints_collection
from bson import ObjectId
from rest_framework.views import APIView
from rest_framework.response import Response
from .services import complaints_collection



class CreateComplaintView(APIView):

    def post(self, request):

        serializer = ComplaintSerializer(data=request.data)

        if serializer.is_valid():

            complaint_data = {
                "title": serializer.validated_data["title"],
                "description": serializer.validated_data["description"],
                "category": serializer.validated_data["category"],
                "user_email": serializer.validated_data["user_email"],
                "status": "Pending"
            }

            result = complaints_collection.insert_one(
                complaint_data
            )

            return Response({
                "message": "Complaint Created",
                "id": str(result.inserted_id)
            }, status=status.HTTP_201_CREATED)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class GetAllComplaintsView(APIView):

    def get(self, request):

        complaints = []

        for complaint in complaints_collection.find():

            complaints.append({
                "id": str(complaint["_id"]),
                "title": complaint["title"],
                "description": complaint["description"],
                "category": complaint["category"],
                "user_email": complaint["user_email"],
                "status": complaint["status"]
            })

        return Response(
            complaints,
            status=status.HTTP_200_OK
        )


class GetSingleComplaintView(APIView):

    def get(self, request, complaint_id):

        complaint = complaints_collection.find_one({
            "_id": ObjectId(complaint_id)
        })

        if not complaint:
            return Response(
                {"message": "Complaint Not Found"},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response({
            "id": str(complaint["_id"]),
            "title": complaint["title"],
            "description": complaint["description"],
            "category": complaint["category"],
            "user_email": complaint["user_email"],
            "status": complaint["status"]
        })


class UpdateComplaintView(APIView):

    def put(self, request, complaint_id):

        status_value = request.data.get("status")

        allowed_statuses = [
            "Pending",
            "In Progress",
            "Resolved",
            "Rejected"
        ]

        if status_value not in allowed_statuses:
            return Response(
                {"message": "Invalid Status"},
                status=status.HTTP_400_BAD_REQUEST
            )

        result = complaints_collection.update_one(
            {"_id": ObjectId(complaint_id)},
            {
                "$set": {
                    "status": status_value
                }
            }
        )

        if result.matched_count == 0:
            return Response(
                {"message": "Complaint Not Found"},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response({
            "message": "Complaint Updated Successfully"
        })
    
class DeleteComplaintView(APIView):

    def delete(self, request, complaint_id):

        result = complaints_collection.delete_one({
            "_id": ObjectId(complaint_id)
        })

        if result.deleted_count == 0:
            return Response(
                {"message": "Complaint Not Found"},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response({
            "message": "Complaint Deleted Successfully"
        })


class MyComplaintsView(APIView):

    def get(self, request):

        email = request.GET.get("email")

        complaints = []

        for complaint in complaints_collection.find(
            {"user_email": email}
        ):

            complaints.append({
                "id": str(complaint["_id"]),
                "title": complaint["title"],
                "description": complaint["description"],
                "category": complaint["category"],
                "user_email": complaint["user_email"],
                "status": complaint["status"]
            })

        return Response(
            complaints,
            status=status.HTTP_200_OK
        )
class MyDashboardStatsView(APIView):

    def get(self, request):

        email = request.GET.get("email")

        complaints = list(
            complaints_collection.find(
                {"user_email": email}
            )
        )

        total = len(complaints)

        pending = len([
            c for c in complaints
            if c["status"] == "Pending"
        ])

        resolved = len([
            c for c in complaints
            if c["status"] == "Resolved"
        ])

        return Response({
            "my_total_complaints": total,
            "my_pending_complaints": pending,
            "my_resolved_complaints": resolved
        })