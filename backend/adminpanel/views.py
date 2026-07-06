from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import AdminUserListSerializer

User = get_user_model()


@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_users_list(request):

    role = request.GET.get("role")

    if role:
        users = User.objects.filter(role=role)
    else:
        users = User.objects.all()

    serializer = AdminUserListSerializer(users, many=True)

    return Response(serializer.data)