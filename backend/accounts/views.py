from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import RegisterSerializer
from .services import users_collection
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

import bcrypt
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            email = serializer.validated_data["email"]

            existing_user = users_collection.find_one({
                "email": email
            })

            if existing_user:
                return Response(
                    {"message": "Email already exists"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            hashed_password = bcrypt.hashpw(
                serializer.validated_data["password"].encode("utf-8"),
                bcrypt.gensalt()
            )

            user_data = {
                "name": serializer.validated_data["name"],
                "email": email,
                "password": hashed_password.decode("utf-8"),
                "role": "user"
            }

            users_collection.insert_one(user_data)

            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors)
class LoginView(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        user = users_collection.find_one({
            "email": email
        })

        if not user:
            return Response(
                {"message": "Invalid Email"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not bcrypt.checkpw(
            password.encode("utf-8"),
            user["password"].encode("utf-8")
        ):
            return Response(
                {"message": "Invalid Password"},
                status=status.HTTP_400_BAD_REQUEST
            )

        refresh = RefreshToken()

        refresh["email"] = user["email"]
        refresh["role"] = user["role"]

        return Response({
            "message": "Login Successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "role": user["role"],
            "email": user["email"],
            "name": user["name"]
        })