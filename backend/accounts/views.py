from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from .serializers import LearnerLoginSerializer
from rest_framework.views import APIView

@api_view(["POST"])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=201)

    return Response(serializer.errors, status=400)

class LearnerLoginView(APIView):
    def post(self, request):
        serializer = LearnerLoginSerializer(data=request.data)

        if serializer.is_valid():
            return Response(
                {
                    "status": "success",
                    "message": "Login successful",
                    "data": serializer.validated_data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "status": "error",
                "message": "Login failed",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )