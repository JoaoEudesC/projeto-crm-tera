let eye = document.getElementById('show_Senha')

let inputSenha = document.getElementById('floatingPassword')

eye.addEventListener("click" , ()=>{
    if(inputSenha.type == "password"){
        inputSenha.type = 'text'
    }
    else{
        inputSenha.type = 'password'
    }


})