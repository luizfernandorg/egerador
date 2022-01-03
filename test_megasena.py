import sqlite3

conn = 0
cursor = 0
quadrante1= [1,2,3,4,5,11,12,13,14,15,21,22,23,24,25]
quadrante2= [6,7,8,9,10,16,17,18,19,20,26,27,28,29,30]
quadrante3= [31,32,33,34,35,41,42,43,44,45,51,52,53,54,55]
quadrante4= [36,37,38,39,40,46,47,48,49,50,56,57,58,59,60]
quandrantes = []
pares= {}
trincas = {}
dezenas = {
    1:0,    2:0,    3:0,    4:0,    5:0,    6:0,    7:0,    8:0,    9:0,    10:0,
    11:0,    12:0,    13:0,    14:0,    15:0,    16:0,    17:0,    18:0,    19:0,    20:0,
    21:0,    22:0,    23:0,    24:0,    25:0,    26:0,    27:0,    28:0,    29:0,    30:0,
    31:0,    32:0,    33:0,    34:0,    35:0,    36:0,    37:0,    38:0,    39:0,    40:0,
    41:0,    42:0,    43:0,    44:0,    45:0,    46:0,    47:0,    48:0,    49:0,    50:0,
    51:0,    52:0,    53:0,    54:0,    55:0,    56:0,    57:0,    58:0,    59:0,    60:0
}
dezenas_porSorteios = {}

try:
    conn = sqlite3.connect('db.sqlite3')
except Exception as e:
    print("An error by connecting DB:", e)

try:
    cursor = conn.execute("SELECT dezena_1, dezena_2, dezena_3, dezena_4, dezena_5, dezena_6 FROM megasena_megasena")
except Exception as e:
    print("An error by executing query:", e)

sorteios = list(cursor)

for row in sorteios:
    quadrante = {
        'quadrante1': 0,
        'quadrante2': 0,
        'quadrante3': 0,
        'quadrante4': 0
    }

    ## Verifica pares
    for x in range(0,5):
        for y in range(x+1,6):
            par = (row[x], row[y])
            if par in pares:
                pares[par] += 1
            else:
                pares[par] = 1

    ## Verifica Trincas
    for x in range(0,4):
        for y in range(x+1,5):
            for z in range(y+1,6):
                trinca = (row[x],row[y],row[z])
                if trinca in trincas:
                    trincas[trinca] += 1
                else:
                    trincas[trinca] = 1

    ## checa quadrante
    for dezena in row:
        for dez in range(1,61):
            if dez not in dezenas_porSorteios:
                dezenas_porSorteios[dez] = {
                    'soma':0,
                    'counter':0,
                    'media':0,
                    'sorteios':0,
                    'ultimoSorteio':0
                }
            if dez in row:
                dezenas_porSorteios[dez]['counter'] += 1
                dezenas_porSorteios[dez]['soma'] += dezenas_porSorteios[dez]['counter']
                dezenas_porSorteios[dez]['sorteios'] += 1
                dezenas_porSorteios[dez]['media'] = dezenas_porSorteios[dez]['soma'] / dezenas_porSorteios[dez]['sorteios']
                dezenas_porSorteios[dez]['counter'] = 0
            else:
                dezenas_porSorteios[dez]['counter'] += 1

        dezenas[dezena] += 1

        if( dezena in quadrante1):
            quadrante['quadrante1'] += 1
        if( dezena in quadrante2):
            quadrante['quadrante2'] += 1
        if( dezena in quadrante3):
            quadrante['quadrante3'] += 1
        if( dezena in quadrante4):
            quadrante['quadrante4'] += 1
    quandrantes.append(quadrante)

sorteios_reverso = sorteios[::-1]

# Checa o ultimo sorteio de cada número
for dez in range(1,61):
    for sorteio in sorteios_reverso:
        if dez not in sorteio:
            dezenas_porSorteios[dez]['ultimoSorteio'] += 1
        else:
            dezenas_porSorteios[dez]['ultimoSorteio'] += 1
            break
for x in dezenas_porSorteios:
    print(x, int(abs(dezenas_porSorteios[x]['media'])), dezenas_porSorteios[x]['ultimoSorteio'] )

dezenas_numeros = open('numeros.txt', 'w')
dezenas_sorted = sorted(dezenas.items(), key=lambda item: item[1], reverse=True)
#dezenas_sorted = sorted(dezenas, key=dezenas.__getitem__, reverse=True)
for k in dezenas_sorted:
    string = f"{k[0]} {k[1]}\n"
    dezenas_numeros.write(string)
    #print(k[0], k[1])

pares_file = open('pares.txt','w')
pares_sorted = sorted(pares)
for k in pares_sorted:
    string = f"{k[0]} {k[1]}-{pares[k]}\n"
    pares_file.write(string)
pares_file.close()

trincas_file = open("trincas.txt",'w')
trincas_sorted = sorted(trincas)
for k in trincas_sorted:
    string = f"{k[0]} {k[1]} {k[2]}-{trincas[k]}\n"
    trincas_file.write(string)
trincas_file.close()
conn.close()