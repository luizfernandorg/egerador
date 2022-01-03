from django.shortcuts import render
from django.http import JsonResponse

from megasena.models import Megasena, Contato

nome_site = 'eGerador'

def index(request):
    return render(request, 'megasena/index.html', {'title': nome_site + " - seu gerador de jogo da mega-sena"})

def chk_jogo(request):

    data = {
        'response': False
    }
    array = []
    array.append(int(request.GET['dez1']))
    array.append(int(request.GET['dez2']))
    array.append(int(request.GET['dez3']))
    array.append(int(request.GET['dez4']))
    array.append(int(request.GET['dez5']))
    array.append(int(request.GET['dez6']))
    array = sorted(array)
    
    # get all the drawn numbers
    sorteios = Megasena.objects.all()
    
    iguais = 0
    # compare prize draw by prize draw with numbers guessed
    for sorteio in sorteios:
        if array[0] == int(sorteio.dezena_1):
            iguais += 1
        if array[1] == int(sorteio.dezena_2):
            iguais += 1
        if array[2] == int(sorteio.dezena_3):
            iguais += 1
        if array[3] == int(sorteio.dezena_4):
            iguais += 1
        if array[4] == int(sorteio.dezena_5):
            iguais += 1
        if array[5] == int(sorteio.dezena_6):
            iguais += 1
        
        # if the prize draw is equal to data.response = True ou False
        if iguais == 6:
            data['response'] = True
            break
        else:
            iguais = 0

    return JsonResponse(data, safe=False)

def contato(request):
    data = {
        'response': True
    }
    try:
        c = Contato(email=request.GET['email'], texto=request.GET['corpo'])
        c.save()
    except:
        data['response'] = False
    
    return JsonResponse(data, safe=True)

def assinar(request):
    return render(request,'megasena/assinar.html', {'title':nome_site})

def landingpage(request):
    return render(request, 'megasena/landingpage.html', {'title':nome_site})