
//Mapeando a tecla enter para enviar o formulario
document.addEventListener('keypress' , (e)=>{
    if(e.key === 'enter')
    botaoRedefinirSenha.click();
})



//Ligação da nossa api com o frontEnd para enviar as instruções de recuperação de senha para o usuário
const form = document.getElementById("form")



const init = () => form.addEventListener('submit' , async(e) => {
    e.preventDefault();
    const data = accessData();
    const url = "http://localhost:8080/users/forgotPassword"
    const MessageAlert = document.getElementById("AlertMessage")
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

    const fectch = await fetch(url , Fetch)
    .then(response =>{
        console.log(response.status);
        if(response.status === 200){
            console.log("Requisição bem feita")
            alert(`Enviamos um email com o token de ativação para o email: ${emailValue}`)
            return window.location.href = "indexResetSenha.html"
        }
        else{
            MessageAlert.style.display = "block"
        }
    } ) 
    .then(data => console.log(data))
    
    .catch((error) =>{
        return console.log("Erro na requisição " + error )
    })

});

const accessData = () =>{
    return{
        email:document.querySelector("input").value
    }
};



accessData();

init();