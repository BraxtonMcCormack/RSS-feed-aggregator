# rss_feed/custom_auth.py

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions
from .models import BlacklistedToken

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            return None
        
        raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None
        
        # Check if token is blacklisted
        is_blacklisted = BlacklistedToken.objects.filter(token = raw_token).exists()
        if is_blacklisted:
            raise exceptions.AuthenticationFailed("Token is blacklisted")
        
        return super().authenticate(request)