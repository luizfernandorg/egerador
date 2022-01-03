"use strict";

var salvar = document.getElementById("btn_salvar"),
    gerar = document.getElementById("btn_gerar"),
    limpar = document.getElementById("btn_limpar"),
    submitFormButton = document.getElementById("submitFormButton");

function genSeq() {
  return Math.floor(60 * Math.random() + 1);
}

function getNumeros() {
  var e = new Array();
  return e[0] = document.getElementById("dez1").value, e[1] = document.getElementById("dez2").value, e[2] = document.getElementById("dez3").value, e[3] = document.getElementById("dez4").value, e[4] = document.getElementById("dez5").value, e[5] = document.getElementById("dez6").value, e;
}

function setNumeros(e) {
  document.getElementById("dez1").value = e[0], document.getElementById("dez2").value = e[1], document.getElementById("dez3").value = e[2], document.getElementById("dez4").value = e[3], document.getElementById("dez5").value = e[4], document.getElementById("dez6").value = e[5];
}

function fun_salvar() {
  var e = !1,
      n = getNumeros(),
      t = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = n[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _e2 = _step.value;
      _e2 && "number" == typeof parseInt(_e2) && (t += 1);
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

  if (6 == t && (e = !0), e) {
    mensagem = document.getElementById("mensagemNotas").style.display = "none";

    var _e = "<div id='jogos'>                <span id='dez1'>".concat(n[0], "</span>                <span id='dez2'>").concat(n[1], "</span>                <span id='dez3'>").concat(n[2], "</span>                <span id='dez4'>").concat(n[3], "</span>                <span id='dez5'>").concat(n[4], "</span>                <span id='dez6'>").concat(n[5], "</span>            </div>");

    var d = document.getElementById("results").insertRow(0),
        a = d.insertCell(0),
        l = d.insertCell(1);
    a.innerHTML = _e, l.innerHTML = "<a href='#' class='align-middle' onclick='fun_excluir_jogo(this)'>excluir</a>", fun_limpar();
  } else alert("é necessário informar números nos campos");
}

function checkIfExist(e, n) {
  for (var t = 0; t < e.length; t++) {
    if (n == e[t]) return !0;
  }

  return !1;
}

function fun_gerar() {
  var e,
      n = getNumeros(),
      t = !0;

  for (; t;) {
    e = n;

    for (var d = 0; d <= 5; d++) {
      if (!e[d]) {
        var _n = genSeq();

        for (;;) {
          if (!checkIfExist(e, _n)) {
            e[d] = _n;
            break;
          }

          _n = genSeq();
        }
      }
    }

    if (chk_repetidos.checked) {
      (function () {
        var a = function a(_a) {
          d = _a.response, n == e && d && alert("sequência já sorteada na megasena"), d ? (n = e, t = !0) : (n = e, t = !1);
        };

        var d = !1,
            l = {
          dez1: 0,
          dez2: 0,
          dez3: 0,
          dez4: 0,
          dez5: 0,
          dez6: 0
        };

        for (var _n2 = 0; _n2 <= e.length; _n2++) {
          l["dez".concat(_n2 + 1)] = e[_n2];
        }

        $.get("megasena/chk_jogo", l, a), t = !1;
      })();
    } else n = e, t = !1;
  }

  setNumeros(n);
}

function fun_limpar() {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = document.getElementsByClassName("dezenas")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var e = _step2.value;
      e.value = "";
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
}

function fun_excluir_jogo(e) {
  e.parentNode.parentNode.remove(), document.getElementById("results").rows.length || (mensagem = document.getElementById("mensagemNotas").style.display = "block");
}

salvar.addEventListener("click", fun_salvar), gerar.addEventListener("click", fun_gerar), limpar.addEventListener("click", fun_limpar), quadrante1 = [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25], quadrante2 = [6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30], quadrante3 = [31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55], quadrante4 = [36, 37, 38, 39, 40, 46, 47, 48, 49, 50, 56, 57, 58, 59, 60];