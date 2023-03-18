//Função para mostrar a senha sem hash ao clicar no icone do olho
const inputSenha = document.getElementsByTagName("input")[2]
const eye = document.getElementById("show_Senha")

eye.addEventListener("click", () =>{
    if(inputSenha.type == "password" ){
        inputSenha.type = "text"
        eye.classList.remove("fa-eye")
        eye.classList.add("fa-eye-slash")
        
    }
    else{
        inputSenha.type = "password"
        eye.classList.remove("fa-eye-slash")
        eye.classList.add("fa-eye")
        
    }
})

//Mapeando o enter para o envio de formulário atravês do keypress
const botaoCadastro = document.getElementById("cadastro")
    document.addEventListener('keypress' , (e)=>{
        if(e.key === 'enter')
        botaoCadastro.click();
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

let ConfirmSenha = document.getElementsByTagName("input")[3]
ConfirmSenha.addEventListener('keyup' , (e) =>{
    const textConfirmSenha = document.getElementById("textAlert")
    if(e.getModifierState('CapsLock')){
        textConfirmSenha.style.display = 'block'
    }
    else{
        textConfirmSenha.style.display = "none"
    }
})




//Ligação da nossa api com o front-end para fazer a recuperação de senha do usuário através do token gerado
    
    const init = () =>{
        const form = document.getElementById('form')
        form.addEventListener("submit" , submitForm)
    };

    const submitForm = async (e) => {
        e.preventDefault()
        //Validação de senha e confirmar a senha , ter certeza que elas coiciden
        let senha = document.getElementsByTagName("input")[2]
        let confirm = document.getElementsByTagName("input")[3].value
        let valueSenha = senha.value
        let MessageError = document.getElementById("MessageError")

        if(valueSenha != confirm){
            valueSenha = ""
            confirm = ""
            senha.focus()
            return MessageError.style.display = "block"
        }
        const data = accessData()
        const url = "http://localhost:8080/users/resetPassword"
        if(!data){
            return console.log("Dados incorretos")
        }
        
        //Mensagens de erro relacionado a validação de token do usuário
        const messageErrorTokenExpired = document.getElementById("messageErrorTokenExpired")
        const messageErrorTokenInvalid = document.getElementById("messageErrorTokenInvalid")
        const messageErrorUserNotFound = document.getElementById("messageErrorUserNotFound")
        const Fetch = {
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "content-Type": "application/json",
                
            },
            credentials: "same-origin"
        }
        
        await fetch(url, Fetch)
        
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            if(data.statusCode === 200 ){
                alert("Senha atualizada com sucesso")
                return window.location.href = "indexlogin.html"
            }
            else if(data.error === "User not found"){
                return messageErrorUserNotFound.style.display="block"
            }
            else if(data.error === "Token invalid"){
                return messageErrorTokenInvalid.style.display ="block"  //Repare que dessa forma, utilizando o data, eu posso manipular os dados enviados do back para fazer as validações, se eu fizer somente através do response, eu tenho acesso através do statusCode, por isso o ideal seria, retornar o response em json e manipular os dados no data
            }
            else if(data.error === 'Token expired, generate a new one'){
                return messageErrorTokenExpired.style.display ="block"
            }
        })
        .catch(error => {
            console.log("Erro na requisição " + error + error.status);
        });
    };

    const accessData = () =>{
            return{
            email: document.getElementsByTagName("input")[0].value,
            passwordResetToken: document.getElementsByTagName("input")[1].value,
            senha: document.getElementsByTagName("input")[2].value
        }
             
            
    }


    init();
    accessData();


        
        