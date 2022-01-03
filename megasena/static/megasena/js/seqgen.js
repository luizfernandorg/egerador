//$(document).ready(function() {

let salvar = document.getElementById('btn_salvar');
let gerar = document.getElementById('btn_gerar');
let limpar = document.getElementById('btn_limpar');
let submitFormButton = document.getElementById('submitFormButton');

function genSeq(){
    let numero = Math.floor((Math.random()*60)+1);
    while(numero > 60 || numero < 1){
        numero = Math.floor((Math.random()*60)+1);
    }
    return numero;
}

// Get the numbers from the respective field
function getNumeros(){
    let numeros = new Array();
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
function setNumeros(numeros){
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
function fun_salvar(){
    let check = false;

    let numeros = getNumeros();

    let counter = 0;
    // loop through the numbers and check if there is a number
    for(let dez of numeros){
        if(dez && typeof(parseInt(dez)) == 'number'){
            counter+=1;
        }
    }
    if(counter==6){
        check = true
    }
    /* when check is true, means that we have 6 numbers, than 
     * generate a new row in the table
     */
    if (check){
        mensagem = document.getElementById("mensagemNotas").style.display = "none";

        let output = `<div id='jogos'>\
                <span id='dez1'>${numeros[0]}</span>\
                <span id='dez2'>${numeros[1]}</span>\
                <span id='dez3'>${numeros[2]}</span>\
                <span id='dez4'>${numeros[3]}</span>\
                <span id='dez5'>${numeros[4]}</span>\
                <span id='dez6'>${numeros[5]}</span>\
            </div>`;
        let table = document.getElementById('results');

        // Create an empty <tr> element and add it to the 2st position of the table:
        var row = table.insertRow(0);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        // Add some text to the new cells:
        cell1.innerHTML = output;
        cell2.innerHTML = "<a href='#' class='align-middle' onclick='fun_excluir_jogo(this)'>excluir</a>";
        fun_limpar();
    }else {
        alert("é necessário informar números nos campos")
    }

}
/*
 * CheckIfExist(numeros, numero)
 * This function get a number and check if the number already exist in the sequence
 * return a boolean depend on the result
 */
function checkIfExist(numeros, numero){
    for (var i = 0; i < numeros.length; i++){
        if(numero == numeros[i]){
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
function fun_gerar(){
    // get a sequence of 6 numbers or numbers values mixed with blank values or get a 6 blank values
    let numeros = getNumeros();
    let numerosATestar;// a copy from numeros variable, to be use for test
    let numbersExist = true; 
    let teste = "TEste";
    // if the sequence exist try to generate a new sequence that not exist
    while(numbersExist){
        numerosATestar = numeros; // generate a copy of numbers for test
        // loop through 6 values of numeros variable
        for(var i = 0; i <= 5; i++){
            // if a number is blank generate a number as value
            if(!numerosATestar[i]){
                // generate a number
                let numero = genSeq();

                /* loop through all the values in the array
                 * check if the generated number already exists in the sequence
                 * if not exist the number is put inside the sequence
                 */
                while(true){
                    // 
                    if(checkIfExist(numerosATestar,numero)){
                        numero = genSeq();
                    }else{
                        numerosATestar[i] = numero
                        break
                    }
                }
            }
        }
        // Do an API call to check if a the sequence of numbers already exists
        if(chk_repetidos.checked){
            let numbersAreEqual = false;
            let param = {
                'dez1':0,
                'dez2':0,
                'dez3':0,
                'dez4':0,
                'dez5':0,
                'dez6':0
            }
            for(let i = 0; i <= numerosATestar.length; i++){
                param[`dez${i+1}`] = numerosATestar[i];
            }
            function chk_jogo(data){
                numbersAreEqual = data.response;
                if(numeros == numerosATestar && numbersAreEqual){
                    alert('sequência já sorteada na megasena');
                }
                if(numbersAreEqual)
                {
                    numeros = numerosATestar;
                    numbersExist = true;
                }else{
                    numeros = numerosATestar;
                    numbersExist = false
                }
            }
            $.get( "megasena/chk_jogo", param, chk_jogo);
            numbersExist = false
        }else{
            numeros = numerosATestar;
            numbersExist = false;
        }
    }
    setNumeros(numeros);
}
// clean the result in the fields
function fun_limpar(){
    for(let elem of document.getElementsByClassName('dezenas')){
        elem.value = "";
    }
}

// Change to exclude li's ul block
function fun_excluir_jogo(current){
    current.parentNode.parentNode.remove();
    let rows_count = document.getElementById('results').rows.length;
    if(!rows_count){
        mensagem = document.getElementById("mensagemNotas").style.display = "block";
    }
}

salvar.addEventListener('click', fun_salvar);
gerar.addEventListener('click', fun_gerar);
limpar.addEventListener('click', fun_limpar);

quadrante1= [1,2,3,4,5,11,12,13,14,15,21,22,23,24,25]
quadrante2= [6,7,8,9,10,16,17,18,19,20,26,27,28,29,30]
quadrante3= [31,32,33,34,35,41,42,43,44,45,51,52,53,54,55]
quadrante4= [36,37,38,39,40,46,47,48,49,50,56,57,58,59,60]