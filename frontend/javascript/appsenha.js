const { error } = require("console");

//Mapeando a tecla enter para enviar o formulario
const botaoRedefinirSenha = document.getElementById("redefinir")
document.addEventListener('keypress' , (e)=>{
    if(e.key === 'enter'){
        botaoRedefinirSenha.click();
    }
    
})



//Ligação da nossa api com o frontEnd para enviar as instruções de recuperação de senha para o usuário
const form = document.getElementById("form")



const init = () => form.addEventListener('submit' , async(e) => {
    e.preventDefault();
    const data = accessData();
    const url = "http://localhost:3333/users/forgotPassword"
    const AlertMessageUserNotFound = document.getElementById("AlertMessageUserNotFound")
    const emailValue = document.querySelector("input").value



    if(!data){
        return console.log("Dados errados")
    }

    const Fetch = {
        method: "POST",
        body:JSON.stringify(data), //Estou passando os dados do meu input para json, para ser enviado o valor do input do front-end para o back-end em formato json
        headers:{
            "Content-Type":"application/json"
        },
        crendetials: "same-origin",
        
    }

    await fetch(url , Fetch)
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(data=>{
        if(data.error == 'User not found'){
            return AlertMessageUserNotFound.style.display = "block"
        }
        else if(data.statusCode === 200){
            alert(`Enviamos um email com o token para ${emailValue}`)
            return window.location.href = "indexResetSenha.html"
        }
        else{
            alert("Erro no servidor local tente novamente mais tarde")
        }
    })
    .catch(error =>{
        console.log("Erro na sua requisição " + error)
    })

});

const accessData = () =>{
    return{
        email:document.querySelector("input").value
    }
};



accessData();

init();