from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    username = models.CharField("username", max_length=25)
    email = models.EmailField("email address", unique=True)
    profile_picture = models.ImageField(upload_to="users/profile_pictures", null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ("username",)
