from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import permissions, views, viewsets, status, pagination

from .serializers import BlogPostCreateSerializer, BlogPostSerializer
from . import models


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in permissions.SAFE_METHODS or
            request.user and
            request.user.is_authenticated
        )



class BlogPostPaginator(pagination.PageNumberPagination):
    page_size = 30


class BlogPostsViewSet(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = BlogPostPaginator

    def get_serializer_class(self):
        if self.action.lower() in ("create", "update", "partial_update", "delete"):
            return BlogPostCreateSerializer

        else:
            return BlogPostSerializer

    def get_queryset(self):
        # Run prefetch_related() because we will be needing the other fields
        return models.BlogPost.objects.all().order_by("-created_at").prefetch_related()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = serializer.save(author=request.user)
        return Response(BlogPostSerializer(post, context=self.get_serializer_context()).data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(BlogPostSerializer(new_instance, context=self.get_serializer_context()).data)
