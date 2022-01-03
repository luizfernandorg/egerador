from django.urls  import path
from megasena import views

app_name= "megasena"

urlpatterns = [
    path('', views.index),
    path('chk_jogo/', views.chk_jogo, name="chk_jogo"),
    path('contato/', views.contato, name="contato"),
]