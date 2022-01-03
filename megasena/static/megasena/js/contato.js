function enviarForm(e){
    if (e.preventDefault) e.preventDefault();
    email = document.getElementById('exampleInputEmail1');
    texto = document.getElementById('exampleFormControlTextarea1');
    let param = {
        email: email.value,
        corpo: texto.value
    };
    $.get('megasena/contato', param, function(data){
        console.log(data.response);
        email.value = '';
        texto.value = '';
    });
    $('#staticBackdrop').modal('hide')
    return false;
}
myForm = document.getElementById("contatoFrom");
myForm.addEventListener('submit', enviarForm);