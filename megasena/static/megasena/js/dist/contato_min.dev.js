"use strict";

function enviarForm(e) {
  e.preventDefault && e.preventDefault(), email = document.getElementById("exampleInputEmail1"), texto = document.getElementById("exampleFormControlTextarea1");
  var t = {
    email: email.value,
    corpo: texto.value
  };
  return $.get("megasena/contato", t, function (e) {
    console.log(e.response), email.value = "", texto.value = "";
  }), $("#staticBackdrop").modal("hide"), !1;
}

myForm = document.getElementById("contatoFrom"), myForm.addEventListener("submit", enviarForm);