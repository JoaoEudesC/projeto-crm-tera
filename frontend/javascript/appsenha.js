

//Mapeando a tecla enter para enviar o formulario
const botaoRedefinirSenha = document.getElementById("redefinir")
document.addEventListener('keypress' , (e)=>{
    if(e.key === 'enter'){
        botaoRedefinirSenha.click();
    }
    
})



//Função de envio de formulário para recuperar senha
const form = document.getElementById("form")



const init = () => form.addEventListener('submit' , async(e) => {
    e.preventDefault();
    const data = accessData();
    const url = "http://localhost:3333/forgotPassword"
    const AlertMessageUserNotFound = document.getElementById("AlertMessageUserNotFound")
    const emailValue = document.querySelector("input").value



    if(!data){
        return console.log("Dados errados")
    }

    const Fetch = {
        method: "POST",
        body:JSON.stringify(data), 
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