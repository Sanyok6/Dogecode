from rest_framework import routers

from . import views


router = routers.SimpleRouter()
router.register('', views.BlogPostsViewSet, basename='blog')


urlpatterns = [] + router.urls
