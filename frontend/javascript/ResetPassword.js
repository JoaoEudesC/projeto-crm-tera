//Função para mostrar a senha sem hash ao clicar no icone do olho

const eye = document.getElementById("show_Senha")
const inputSenha = document.getElementsByTagName("input")[2]

eye.addEventListener("click", () =>{
    if(inputSenha.type == "password" ){
        inputSenha.type = "text"
        eye.style.textDecoration ="line-through"
    }
    else{
        inputSenha.type = "password"
        eye.style.textDecoration ="none"
    }
})

//Mapeando o enter para o envio de formulário atravês do keypress
const form = document.getElementById('form')
    document.addEventListener('keypress' , (e)=>{
        if(e.key === 'enter')
        form.onsubmit();
    })

//Mapeando a tecla capslock para avisar ao usuario se a tecla está ativada ou não ao inserir a senha

inputSenha.addEventListener('keyup' , (e)=>{
    const textAlert = document.getElementById('TextAlert')
    if(e.getModifierState('CapsLock')){
        textAlert.style.display='block'
    }
    else{
        textAlert.style.display = 'none'
    }
    
})

    