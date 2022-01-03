from django.db import models

class Megasena(models.Model):
    concurso = models.IntegerField()
    data_sorteio= models.CharField(max_length=11)
    dezena_1 = models.IntegerField()
    dezena_2 = models.IntegerField()
    dezena_3 = models.IntegerField()
    dezena_4 = models.IntegerField()
    dezena_5 = models.IntegerField()
    dezena_6 = models.IntegerField()

    def __str__(self):
        return "concurso " + str(self.concurso)

class Contato(models.Model):
    email = models.CharField(max_length=100)
    texto = models.TextField()

    def __str__(self):
        return self.email