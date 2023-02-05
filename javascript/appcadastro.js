
//Seleção de elementos  
    
    
    //Botao de cadastro
        let botaoCadastro = document.getElementById("cadastro")
    
    
    //Inputs
        let senha = document.getElementsByTagName("input")[2]
        let confirmarSenha = document.getElementsByTagName("input")[3]
        let nome = document.getElementById('NomeCompleto')
        let email = document.getElementById("email")
        let codigopostal = document.getElementById("cep")
        let logradouro = document.getElementById('logradouro')
        let bairro = document.getElementById('bairro')
        let localidade = document.getElementById('localidade')
        let uf = document.getElementById('uf')
        
        
    //Formulario
        const form = document.getElementById('Form')
    
    






//Pegando os values de cada input
    let Nome = nome.value
    let Email = email.value
    let Password =senha.value
    let ConfirmarSenha = confirmarSenha.value
    let codigoPostal = codigopostal.value
    let Logradouro = logradouro.value
    let Bairro = bairro.value
    let Localidade = localidade.value
    let UF = uf.value

    
//Adição de evento ao botão de cadastro
    botaoCadastro.addEventListener("click", AdicionarLocalStorage )

    
    
//Adição de elementos ao local storage e função de click do botao cadastrar
    function AdicionarLocalStorage(){
        localStorage.setItem('Nome',Nome );
        localStorage.setItem('Senha' , Password)
        localStorage.setItem('Confirmar senha' , ConfirmarSenha)
        localStorage.setItem('Email' , Email);
        localStorage.setItem('Cep' , codigoPostal);
        localStorage.setItem('Logradouro' , Logradouro);
        localStorage.setItem('Bairro' , Bairro);
        localStorage.setItem('Localidade' , Localidade)
        localStorage.setItem('UF' , UF);
        
    console.log(UF)
    console.log(Localidade)
    
    
}


//Adição de evento de submmit no form para realizar as validações 
    form.addEventListener('submit' , (e) =>{
        e.preventDefault()
        if(Senha =! ConfirmarSenha){
            alert(' as senhas nao coincidem')
            senha.value = ""
            confirmarSenha.value=""
            senha.focus()
        
        
        }
    })
    

//Mapeando a tecla enter para enviar o formulario
    document.addEventListener('keypress' , (e)=>{
        if(e.key === 'enter')
        botaoCadastro.click();
    })

//Mapeando a tecla capslock para avisar ao usuario se a tecla está ativada ou não ao inserir a senha
senha.addEventListener('keyup' , (e)=>{
    const textoAlerta = document.getElementById('uperCase')
    if(e.getModifierState('CapsLock')){
        textoAlerta.style.display = 'block'
    }
    else{
        textoAlerta.style.display ='none'
    }
})


confirmarSenha.addEventListener('keyup' , (e)=>{
    const uperCaseConfirm = document.getElementById('uperCaseConfirm')
    if(e.getModifierState('CapsLock')){
        uperCaseConfirm.style.display = 'block'
    }
    else{
        uperCaseConfirm.style.display = 'none'
    }
})
    
    







// aplicação de api/cep
    const cep = document.querySelector("#cep");


    const options = {
        method:"get",
        mode: "cors",
        cache:"default"
    }

    const showdata = (result)=>{
        for(const campo in result){
            if(document.querySelector("#"+campo)){
                document.querySelector("#"+campo).value =result[campo];
            }
        }
    }

    cep.addEventListener("blur", (e) => {
            let search = cep.value.replace("-", "");
            console.log(search);
            fetch( `https://viacep.com.br/ws/${search}/json/`, options)
            .then(response => {
            response.json()
            .then(data=>{
                showdata(data)
            })
        })
    
        .catch(e=>{ 
            console.log("Falha de conexão " + e)
        })
    
    }) 



    //teste 

    const toque = document.getElementById("Clicou")

    toque.addEventListener("click" , clicou)

    function clicou(){
        console.log(Nome)
        console.log(Email)
        console.log(Password)
        console.log(UF)
    }



    
    
    
    
    
    
    
    
    // => Ligação da nossa api do banco de dados com o nosso frontend


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
        return console.log("Dados nao estão corretos")
    }
    
    // credentials => "same-origin" é usada no contexto de requisições HTTP com o Fetch API e indica que as credenciais (cookies e headers de autenticação) devem ser incluídas na requisição se o URL da requisição for da mesma origem do aplicativo cliente. Em outras palavras, isso permite que a requisição acesse recursos protegidos que dependem de autenticação da mesma origem. Se o URL da requisição for de uma origem diferente, as credenciais não serão incluídas na requisição.
    
    //criação do metodo de requisição para submeter os dados do formulário de forma correta
    const Fetch = {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "content-Type": "application/json",
            
        },
        credentials: "same-origin"
        

    }
    console.log(data)
    
    fetch(url, Fetch) 
    .then((response)=>{
        return alert("Usuário cadastrado com sucesso" , response.json())
    })
    
    .then((data)=>{
        console.log(data)
    })
    
    .catch((error)=>{
        return console.log("erro na requisição" + error)
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

accessData();







//função para pegar todos os usuários do banco e mostrar no console da aplicação (GET ALL) função para testar o funcionamento da api


const Botao = document.getElementById("Clicar")

    Botao.addEventListener("click" , ShowUser)

    function ShowUser(){
        console.log()
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
        



















