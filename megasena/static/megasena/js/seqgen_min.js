let salvar=document.getElementById("btn_salvar"),gerar=document.getElementById("btn_gerar"),limpar=document.getElementById("btn_limpar"),submitFormButton=document.getElementById("submitFormButton");function genSeq(){let e=Math.floor(60*Math.random()+1);for(;e>60||e<1;)e=Math.floor(60*Math.random()+1);return e}function getNumeros(){let e=new Array;return e[0]=document.getElementById("dez1").value,e[1]=document.getElementById("dez2").value,e[2]=document.getElementById("dez3").value,e[3]=document.getElementById("dez4").value,e[4]=document.getElementById("dez5").value,e[5]=document.getElementById("dez6").value,e}function setNumeros(e){document.getElementById("dez1").value=e[0],document.getElementById("dez2").value=e[1],document.getElementById("dez3").value=e[2],document.getElementById("dez4").value=e[3],document.getElementById("dez5").value=e[4],document.getElementById("dez6").value=e[5]}function fun_salvar(){let e=!1,t=getNumeros(),n=0;for(let e of t)e&&"number"==typeof parseInt(e)&&(n+=1);if(6==n&&(e=!0),e){mensagem=document.getElementById("mensagemNotas").style.display="none";let e=`<div id='jogos'>                <span id='dez1'>${t[0]}</span>                <span id='dez2'>${t[1]}</span>                <span id='dez3'>${t[2]}</span>                <span id='dez4'>${t[3]}</span>                <span id='dez5'>${t[4]}</span>                <span id='dez6'>${t[5]}</span>            </div>`;var a=document.getElementById("results").insertRow(0),d=a.insertCell(0),l=a.insertCell(1);d.innerHTML=e,l.innerHTML="<a href='#' class='align-middle' onclick='fun_excluir_jogo(this)'>excluir</a>",fun_limpar()}else alert("é necessário informar números nos campos")}function checkIfExist(e,t){for(var n=0;n<e.length;n++)if(t==e[n])return!0;return!1}function fun_gerar(){let e,t=getNumeros(),n=!0;for(;n;){e=t;for(var a=0;a<=5;a++)if(!e[a]){let t=genSeq();for(;;){if(!checkIfExist(e,t)){e[a]=t;break}t=genSeq()}}if(chk_repetidos.checked){let a=!1,l={dez1:0,dez2:0,dez3:0,dez4:0,dez5:0,dez6:0};for(let t=0;t<=e.length;t++)l[`dez${t+1}`]=e[t];function d(d){a=d.response,t==e&&a&&alert("sequência já sorteada na megasena"),a?(t=e,n=!0):(t=e,n=!1)}$.get("megasena/chk_jogo",l,d),n=!1}else t=e,n=!1}setNumeros(t)}function fun_limpar(){for(let e of document.getElementsByClassName("dezenas"))e.value=""}function fun_excluir_jogo(e){e.parentNode.parentNode.remove(),document.getElementById("results").rows.length||(mensagem=document.getElementById("mensagemNotas").style.display="block")}salvar.addEventListener("click",fun_salvar),gerar.addEventListener("click",fun_gerar),limpar.addEventListener("click",fun_limpar),quadrante1=[1,2,3,4,5,11,12,13,14,15,21,22,23,24,25],quadrante2=[6,7,8,9,10,16,17,18,19,20,26,27,28,29,30],quadrante3=[31,32,33,34,35,41,42,43,44,45,51,52,53,54,55],quadrante4=[36,37,38,39,40,46,47,48,49,50,56,57,58,59,60];