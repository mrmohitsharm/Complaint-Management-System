from django.urls import path
from .views import CreateComplaintView, GetAllComplaintsView ,  GetSingleComplaintView , UpdateComplaintView ,  DeleteComplaintView

urlpatterns = [
    path("create/", CreateComplaintView.as_view()),
 
   path("", GetAllComplaintsView.as_view()),
    path("<str:complaint_id>/", GetSingleComplaintView.as_view()),
  path("update/<str:complaint_id>/", UpdateComplaintView.as_view()),
  path("delete/<str:complaint_id>/", DeleteComplaintView.as_view()),
]