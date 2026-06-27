from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.services import users_collection
from complaints.services import complaints_collection
from bson import ObjectId


class DashboardStatsView(APIView):

    def get(self, request):

        total_users = users_collection.count_documents({})

        total_complaints = complaints_collection.count_documents({})

        pending = complaints_collection.count_documents({
            "status": "Pending"
        })

        resolved = complaints_collection.count_documents({
            "status": "Resolved"
        })

        return Response({

            "total_users": total_users,

            "total_complaints": total_complaints,

            "pending_complaints": pending,

            "resolved_complaints": resolved

        })
class RecentComplaintsView(APIView):

    def get(self, request):

        complaints = []

        recent = complaints_collection.find().sort("_id", -1).limit(5)

        for complaint in recent:

            complaints.append({
                "id": str(complaint["_id"]),
                "title": complaint["title"],
                "category": complaint["category"],
                "status": complaint["status"],
                "user_email": complaint["user_email"]
            })

        return Response(complaints)
class ComplaintAnalyticsView(APIView):

    def get(self, request):

        pending = complaints_collection.count_documents({
            "status": "Pending"
        })

        resolved = complaints_collection.count_documents({
            "status": "Resolved"
        })

        return Response({
            "Pending": pending,
            "Resolved": resolved
        })