// Ligação da nossa api do banco de dados com o nosso frontend


//Pegando os valores dos inputs do formulário

const inputNomeCompleto = document.getElementById("NomeCompleto")
const inputEmail = document.getElementById("email")
const inputSenha = document.getElementById("senha")
const inputCep = document.getElementById("cep")
const inputLogradouro = document.getElementById("logradouro")
const inputBairro = document.getElementById("bairro")
const inputLocalidade = document.getElementById("localidade")
const EstadoFederal = document.getElementById("uf")




//criação da função de submeter o formulário para o backend

const init = ()=>{
    const botao =  document.getElementById("cadastro")
    botao.addEventListener("click" , submitForm)
};


const submitForm = (e) =>{
    e.preventDefault();
    
    const data = accessData()
    const url = "http://localhost:3000/users/create"

    if(!data){
        return;
    }
    
    
    //criação do metodo de requisição para submeter os dados do formulário de forma correta
    const Fettch = {
        method:"POST",
        headers:{
            "content-Type": "application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(data)

    }
    console.log(data)
    
    fetch(url, Fettch) 
    .then((response)=>{
        return alert("cadastro realizado com sucesso" , response.json())
    
    })
    .catch((e)=>{
        return console.error(e ,  "erro de validaçaõ");
    })

};


//Função para acessar os valores enviados através dos inputs


const accessData = ()=>{
    return{
        nome:inputNomeCompleto.value,
        email:inputEmail.value,
        senha:inputSenha.value,
        cep:inputCep.value,
        logradouro:inputLogradouro.value,
        localidade:inputLocalidade.value,
        uf:EstadoFederal.value,
    }
}

init();




//função para pegar todos os usuários do banco e mostrar no console da aplicação (GET ALL)


const Botao = document.getElementById("Clicar")

    Botao.addEventListener("click" , ShowUser)

    function ShowUser(){
        fetch("http://localhost:3000/all"  )
        .then((response)=>{
            return response.json()
            .then((data)=>{
                console.log(data)
            })
        })
        .catch((e)=>{
            return console.error(e)
        })




    }
        



    
    









