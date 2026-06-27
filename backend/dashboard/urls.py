from django.urls import path
from .views import DashboardStatsView , RecentComplaintsView , ComplaintAnalyticsView

urlpatterns = [
    path("stats/", DashboardStatsView.as_view()),
      path("recent/", RecentComplaintsView.as_view()),
      path("analytics/", ComplaintAnalyticsView.as_view()),
]