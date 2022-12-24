//Seleção de Elementos
    let eye = document.getElementById('show_Senha')
    const senha = document.getElementsByTagName('input')[1]
    const email = document.getElementsByTagName('input')[0]
    const botaoLogin = document.getElementById('entrar')
    const form = document.getElementById('form')
    
    




//Mapeando o enter para o envio de formulário atravês do keypress
document.addEventListener('keypress' , (e)=>{
    if(e.key === 'enter')
    botaoLogin.click();
})



//Mapeando a tecla capslock para avisar ao usuario se a tecla está ativada ou não ao inserir a senha
senha.addEventListener('keyup' , (e)=>{
    const textAlert = document.getElementById('textAlert')
    if(e.getModifierState('CapsLock')){
        textAlert.style.display='block'
    }
    else{
        textAlert.style.display = 'none'
    }
})

//Icone do olho que esconde  e mostra a senha

eye.addEventListener("click" , ()=>{
    if(senha.type == "password"){
        senha.type = 'text'
    }
    else{
        senha.type = 'password'
    }


})



//Autenticaçao e login
form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const  EmailValue = email.value
    const SenhaValue = senha.value
    if(EmailValue == 'Admin@gmail.com' && SenhaValue == 'Admin'){
        alert('usuario cadastrado com sucesso')
        window.location.replace('file://wsl.localhost/Ubuntu/home/joao/projeto-crm-tera/index.html')
    }
    else{
        alert('Email ou senha invalidos')
        email.value = ""
        senha.value = ""
        email.focus()

    }
})








