"use strict";

//$(document).ready(function() {
var salvar = document.getElementById('btn_salvar');
var gerar = document.getElementById('btn_gerar');
var limpar = document.getElementById('btn_limpar');
var submitFormButton = document.getElementById('submitFormButton');

function genSeq() {
  var numero = Math.floor(Math.random() * 60 + 1);
  return numero;
} // Get the numbers from the respective field


function getNumeros() {
  var numeros = new Array();
  numeros[0] = document.getElementById('dez1').value;
  numeros[1] = document.getElementById('dez2').value;
  numeros[2] = document.getElementById('dez3').value;
  numeros[3] = document.getElementById('dez4').value;
  numeros[4] = document.getElementById('dez5').value;
  numeros[5] = document.getElementById('dez6').value;
  return numeros;
}
/*
 * Set the numbers in the repective field
 * take an array as a paramenter
 */


function setNumeros(numeros) {
  document.getElementById('dez1').value = numeros[0];
  document.getElementById('dez2').value = numeros[1];
  document.getElementById('dez3').value = numeros[2];
  document.getElementById('dez4').value = numeros[3];
  document.getElementById('dez5').value = numeros[4];
  document.getElementById('dez6').value = numeros[5];
}
/*
 * Function Salvar()
 * get the sequence and put in the table
 * 
 */


function fun_salvar() {
  var check = false;
  var numeros = getNumeros();
  var counter = 0; // loop through the numbers and check if there is a number

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = numeros[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var dez = _step.value;

      if (dez && typeof parseInt(dez) == 'number') {
        counter += 1;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (counter == 6) {
    check = true;
  }
  /* when check is true, means that we have 6 numbers, than 
   * generate a new row in the table
   */


  if (check) {
    mensagem = document.getElementById("mensagemNotas").style.display = "none";
    var output = "<div id='jogos'>                <span id='dez1'>".concat(numeros[0], "</span>                <span id='dez2'>").concat(numeros[1], "</span>                <span id='dez3'>").concat(numeros[2], "</span>                <span id='dez4'>").concat(numeros[3], "</span>                <span id='dez5'>").concat(numeros[4], "</span>                <span id='dez6'>").concat(numeros[5], "</span>            </div>");
    var table = document.getElementById('results'); // Create an empty <tr> element and add it to the 2st position of the table:

    var row = table.insertRow(0); // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1); // Add some text to the new cells:

    cell1.innerHTML = output;
    cell2.innerHTML = "<a href='#' class='align-middle' onclick='fun_excluir_jogo(this)'>excluir</a>";
    fun_limpar();
  } else {
    alert("é necessário informar números nos campos");
  }
}
/*
 * CheckIfExist(numeros, numero)
 * This function get a number and check if the number already exist in the sequence
 * return a boolean depend on the result
 */


function checkIfExist(numeros, numero) {
  for (var i = 0; i < numeros.length; i++) {
    if (numero == numeros[i]) {
      return true;
    }
  }

  return false;
}
/*
 * fun_gerar()
 * Generates a sequence of 6 numbers
 * the function uses the getNumeros() to get all the numbers that the users informed or not
 * also uses the checkIfExist() to check if a number exist in the sequence
 */


function fun_gerar() {
  // get a sequence of 6 numbers or numbers values mixed with blank values or get a 6 blank values
  var numeros = getNumeros();
  var numerosATestar; // a copy from numeros variable, to be use for test

  var numbersExist = true;
  var teste = "TEste"; // if the sequence exist try to generate a new sequence that not exist

  while (numbersExist) {
    numerosATestar = numeros; // generate a copy of numbers for test
    // loop through 6 values of numeros variable

    for (var i = 0; i <= 5; i++) {
      // if a number is blank generate a number as value
      if (!numerosATestar[i]) {
        // generate a number
        var numero = genSeq();
        /* loop through all the values in the array
         * check if the generated number already exists in the sequence
         * if not exist the number is put inside the sequence
         */

        while (true) {
          // 
          if (checkIfExist(numerosATestar, numero)) {
            numero = genSeq();
          } else {
            numerosATestar[i] = numero;
            break;
          }
        }
      }
    } // Do an API call to check if a the sequence of numbers already exists


    if (chk_repetidos.checked) {
      (function () {
        var chk_jogo = function chk_jogo(data) {
          numbersAreEqual = data.response;

          if (numeros == numerosATestar && numbersAreEqual) {
            alert("sequência já sorteada na megasena");
          }

          if (numbersAreEqual) {
            numeros = numerosATestar;
            numbersExist = true;
          } else {
            numeros = numerosATestar;
            numbersExist = false;
          }
        };

        var numbersAreEqual = false;
        var param = {
          'dez1': 0,
          'dez2': 0,
          'dez3': 0,
          'dez4': 0,
          'dez5': 0,
          'dez6': 0
        };

        for (var _i = 0; _i <= numerosATestar.length; _i++) {
          param["dez".concat(_i + 1)] = numerosATestar[_i];
        }

        $.get("megasena/chk_jogo", param, chk_jogo);
        numbersExist = false;
      })();
    } else {
      numeros = numerosATestar;
      numbersExist = false;
    }
  }

  setNumeros(numeros);
} // clean the result in the fields


function fun_limpar() {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = document.getElementsByClassName('dezenas')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var elem = _step2.value;
      elem.value = "";
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
} // Change to exclude li's ul block


function fun_excluir_jogo(current) {
  current.parentNode.parentNode.remove();
  var rows_count = document.getElementById('results').rows.length;

  if (!rows_count) {
    mensagem = document.getElementById("mensagemNotas").style.display = "block";
  }
}

salvar.addEventListener('click', fun_salvar);
gerar.addEventListener('click', fun_gerar);
limpar.addEventListener('click', fun_limpar);
quadrante1 = [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25];
quadrante2 = [6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30];
quadrante3 = [31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55];
quadrante4 = [36, 37, 38, 39, 40, 46, 47, 48, 49, 50, 56, 57, 58, 59, 60];