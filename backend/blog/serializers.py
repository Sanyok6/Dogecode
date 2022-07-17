from rest_framework import serializers

from authentication.serializers import UserSerializer
from . import models


class PostTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PostTags
        fields = "__all__"


class BlogPostCreateSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(many=True, required=False, queryset=models.PostTags.objects.all())
    class Meta:
        model = models.BlogPost
        fields = ("title", "content", "created_at", "tags")

class BlogPostSerializer(BlogPostCreateSerializer):
    author = UserSerializer()
    tags = PostTagsSerializer(many=True)

    class Meta(BlogPostCreateSerializer.Meta):
        fields = ("id", "title", "content", "author", "created_at", "updated_at", "tags")
