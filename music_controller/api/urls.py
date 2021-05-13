from django.urls import path
from .views import RoomView, CraeteRoomView

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CraeteRoomView.as_view())
]
