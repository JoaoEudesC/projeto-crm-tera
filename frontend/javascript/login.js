
    
//Mapeando o enter para o envio de formulário atravês do keypress
const botao = document.getElementById("entrar")
document.addEventListener('keypress' , (e)=>{
        if(e.key === 'enter')
        botao.click();
        
    })



//Mapeando a tecla capslock para avisar ao usuario se a tecla está ativada ou não ao inserir a senha
const Senha = document.getElementsByTagName('input')[1]
    Senha.addEventListener('keyup' , (e)=>{
        const textAlert = document.getElementById('textAlert')
        if(e.getModifierState('CapsLock')){
            textAlert.style.display='block'
        }
        else{
            textAlert.style.display = 'none'
        }
        
    })

//Icone do olho que esconde  e mostra a senha
let eye = document.getElementById("show_Senha")
    eye.addEventListener("click", ()=>{
        if(Senha.type == "password"){
            Senha.type = 'text'
            eye.classList.remove("fa-eye")
            eye.classList.add("fa-eye-slash")
            
        }
        else{
            Senha.type = 'password'
            eye.classList.remove("fa-eye-slash")
            eye.classList.add("fa-eye")

        }
    })


//Função do checkBox lembre-me
    let checkBox = document.getElementById("Check1")
    let inputEmail = document.querySelector("input")
    let inputSenha = document.getElementsByTagName("input")[1]


    document.addEventListener("DOMContentLoaded" , () =>{
        if(localStorage.getItem("email") && localStorage.getItem("password")){
            inputEmail.value = localStorage.getItem("email");
            inputSenha.value = localStorage.getItem("password");
            document.getElementById("Check1").checked = true;
        }
    });

    
    checkBox.addEventListener("change" , () =>{
        if(checkBox.checked){
            localStorage.setItem("email" , inputEmail.value)
            localStorage.setItem("password", inputSenha.value )
        }
        else{
            localStorage.removeItem("email")
            localStorage.removeItem("password")
        }
    })




//Função de encio de formulário de login
    const form = document.getElementById('form')
    const init = () => form.addEventListener('submit' , async (e)=>{
        e.preventDefault();
        const data = accessData(); 
        const url = "http://localhost:3333/users/login"
        const MessageErrorUserNotAuthorized = document.getElementById("MessageAlert")

        
        
        if(!data){
            return console.log("Dados errados ")
        }
        
        const Fetch = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
        }
        
        await fetch(url , Fetch)
        
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data =>{
            if(data.statusCode === 401){
            return MessageErrorUserNotAuthorized.style.display = 'block'
            }
            else if(data.statusCode === 200){
                alert("Login realizado com sucesso")
                return window.location.href = "UsuárioCadastrado.html"
            }
            else{
                alert("Erro no servidor local tente novamente mais tarde")
            }
        })

        .catch(error =>{
            return console.log("Erro na sua requisição " + error)
        })
        

        

    });



const accessData = ()=>{
    return{
        senha: document.getElementsByTagName('input')[1].value,
        email: document.getElementsByTagName('input')[0].value
    };
};

accessData();

init();











