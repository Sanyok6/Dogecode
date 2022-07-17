from django.contrib import admin

from . import models


class PostTagsAdmin(admin.ModelAdmin):
    list_display = ('name',)


class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')


admin.site.register(models.PostTags, PostTagsAdmin)
admin.site.register(models.BlogPost, BlogPostAdmin)
