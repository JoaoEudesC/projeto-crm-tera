//Seleção de Elementos
    let eye = document.getElementById('show_Senha')
    const senha = document.getElementsByTagName('input')[1]
    const email = document.getElementsByTagName('input')[0].value
    const botaoLogin = document.getElementById('entrar')
    const form = document.getElementById('form')

    //pegando o value da senha
        const Senha = senha.value
    
    




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





//Autenticaçao e login => Ligação da nossa aplicação com o backend , a parte de login , da rota login, autenticação e login

const init = () => form.addEventListener('submit' , (e)=>{
    e.preventDefault();



    const data = accessData();

    const url = "http://localhost:3000/users"

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



    fetch(`${url}/login` , Fetch)

    .then((response)=>{
        return alert("Login realizado com sucesso" , response.json())
    })

    .then((data)=>{
        console.log(data)
    })

    .catch((error)=>{
        return console.log("erro na requisição" + error)
    })

});




const accessData = ()=>{
    return{
        Senha,
        email
    };
};


init()

















//Função de teste dando o getAll em todos os usuários para testar a api da aplicação


const botaoTeste = document.getElementById("teste")

botaoTeste.addEventListener("click" , (e)=>{
    fetch("http://localhost:3000/users/all")
    .then((response) =>{
        return response.json()
    })
    .then((data)=>{
      return  console.log(data)
    })

    .catch((errror)=>{
        console.log("ERRO NA REQUISIÇÃO" + errror)
    })
});















