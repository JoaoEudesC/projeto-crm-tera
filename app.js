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
    let nome = document.getElementById('name')
    let email = document.getElementById('email')
    let telefone = document.getElementById("telefone")
    let nome1 = nome.value
    let email1 = email.value
    let telefone1 = telefone.value

    
    if(nome1.match(/^[a-zA-Z_ ]*$/)){
        if (nome1 == "") { 
            let div = document.getElementById('infos')
            let h4 = div.innerHTML = `<h4>Por favor, preencha seu nome!</h4>`
        }else if(email1 == "" || telefone1 ==""){
            let div = document.getElementById('infos')
            let h4 = div.innerHTML = `<h4 style="color: red">Por favor, preencha os campos de e-mail, telefone e digite sua necessidade!</h4>`
        }else{
            let div = document.getElementById('div1')
            let h4 = div.innerHTML = `<h4>Olá ${nome1}, obrigado pelo seu contato. Assim que analisarmos suas necessidades, entraremos em contato através do telefone ${telefone1} ou
            do endereço de e-mail ${email1}`
        }
    }else{
        let div = document.getElementById('infos')
        let h4 = div.innerHTML = `<h4 style="color: red">Nome deve conter apenas letas, sem numeros!</h4>`
    }
}