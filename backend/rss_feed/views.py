from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, FeedSerializer, CategorySerializer, ArticleSerializer
from .models import BlacklistedToken, Feed, Category, Article
from rest_framework.decorators import api_view


# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({'user_id': self.user.id})
        return data
    
class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    def post(self, request):
        token = request.data.get("token")
        if token:
            BlacklistedToken.objects.create(token = token)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class FeedListCreate(generics.ListCreateAPIView):
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer

class CategoryListCreate(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ArticleListCreate(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

@api_view(['POST'])
def toggle_read_status(request, article_id):
    try:
        article = Article.objects.get(id = article_id)
    except Article.DoesNotExist:
        return Response(status = 404)

    article.read = not article.read
    article.save()

    return Response(status = 200)