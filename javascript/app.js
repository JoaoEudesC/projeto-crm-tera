// Scroll suave rolagem
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


function btn(){
    $("#form1").submit(function(event){
        event.preventDefault();
        let nome = document.getElementById('name')
        let email = document.getElementById('email')
        let telefone = document.getElementById("telefone")
        let texto = document.getElementById("texto_contato")
        let nome1 = nome.value
        let email1 = email.value
        let telefone1 = telefone.value
        let texto1 = texto.value
        let div = document.getElementById('infos')
        let regex = /^[0-9]+$/;

        if (nome1.match(regex)){
            return div.innerHTML = `<h4 style="color: red">Nome deve conter apenas letas, sem numeros!</h4>`
        }

        if(nome1=="" || nome1<4){
            return div.innerHTML = `<h4 style="color: red">Por favor, preencha seu nome!</h4>`
        }

        if(email1 == "" || telefone1 ==""){
            return div.innerHTML = `<h4 style="color: red">Por favor, preencha os campos de e-mail, telefone e digite sua necessidade!</h4>`
        }
        if(telefone1.length <= 10)
        {
            return div.innerHTML = `<h4 style="color: red">O numero de telefone precisa ter 11 digitos contando com o DDD!</h4>`
        }
        if(texto1==="" || texto1.length <=5){
            return div.innerHTML = `<h4 style="color: red">Por favor, preencha o campo de texto! Este campo deve ter no minimo 5 caracteres.</h4>`
        }

    (this).submit();

    })
}

// Conferir configuração de caracteres do telefone
$(document).ready(function(){
    $('body').on('focus', '.telefone', function(){
        var maskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        options = {
            onKeyPress: function(val, e, field, options) {
                field.mask(maskBehavior.apply({}, arguments), options);

                if(field[0].value.length >= 14){
                    var val = field[0].value.replace(/\D/g, '');
                    if(/\d\d(\d)\1{7,8}/.test(val)){
                        field[0].value = '';
                        alert('Telefone Invalido');
                    }
                }
            }
        };
        $(this).mask(maskBehavior, options);
    });
});
