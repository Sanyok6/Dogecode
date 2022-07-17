from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.utils import timezone


class PostTags(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True, blank=True, allow_unicode=True)

    def save(self, *args, **kwargs):
        if self._state.adding and not self.slug:
            self.slug = slugify(self.name)

        return super().save(*args, **kwargs)


class BlogPost(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(max_length=5000)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    tags = models.ManyToManyField(PostTags)

    def save(self, *args, **kwargs):
        if not self._state.adding:
            self.updated_at = timezone.now()

        return super().save(*args, **kwargs)
