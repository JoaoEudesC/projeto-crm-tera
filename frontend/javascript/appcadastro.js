
    
    
    
    

//Mapeando a tecla enter para enviar o formulario
const botaoCadastro = document.getElementById("cadastro")
    document.addEventListener('keypress' , (e)=>{
        if(e.key === 'enter')
        botaoCadastro.click();
    })

//Mapeando a tecla capslock para avisar ao usuario se a tecla está ativada ou não ao inserir a senha
let senha = document.getElementsByTagName("input")[2]
    senha.addEventListener('keyup' , (e)=>{
        const textoAlerta = document.getElementById('uperCase')
        if(e.getModifierState('CapsLock')){
            textoAlerta.style.display = 'block'
        }
        else{
            textoAlerta.style.display ='none'
        }
    })
    
let confirmarSenha = document.getElementsByTagName("input")[3]
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















    // => Ligação da nossa api do banco de dados com o nosso frontend para realizar o cadastro dos usuários


//criação da função de submeter o formulário para o backend

const init = ()=>{
    const form = document.getElementById('Form')
    form.addEventListener("submit" , submitForm)
};

const submitForm = async (e) =>{
    
    e.preventDefault();
//Validação de senha e confirmar a senha , ter certeza que elas coiciden 
    let senha = document.getElementById("senha")
    let confirm = document.getElementById("confirmarSenha").value
    let valueSenha = senha.value
    let MessageError = document.getElementById("MessageError")
    
    if(valueSenha != confirm  ){
        valueSenha = ""
        confirm = ""
        senha.focus()
        return MessageError.style.display ="block"
    }
//Config dos dados a serem passados no fetch  e realização do fetcg api
    const data = accessData()
    const url = "http://localhost:8080/users/create"
    if(!data){
        return console.log("Dados nao estão corretos")
    }
    
// credentials => "same-origin" é usada no contexto de requisições HTTP com o Fetch API e indica que as credenciais (cookies e headers de autenticação) devem ser incluídas na requisição se o URL da requisição for da mesma origem do aplicativo cliente. Em outras palavras, isso permite que a requisição acesse recursos protegidos que dependem de autenticação da mesma origem. Se o URL da requisição for de uma origem diferente, as credenciais não serão incluídas na requisição.
    
//Mensagem de erro caso o email cadastrado já exista no banco de dados
    const existingEmailMessage = document.getElementById("MessageEmailExist")

//criação do metodo de requisição para submeter os dados do formulário de forma correta
    const Fetch = {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "content-Type": "application/json",
            
        },
        credentials: "same-origin"
    }
    
    await fetch(url, Fetch) 
    .then((response)=>{
        if(response.status == 201){
            alert("Cadastro realizado com sucesso")
            return window.location.href = "indexlogin.html"
        }
        else if(response.status == 422){
            return existingEmailMessage.style.display = "block"
        }
        else{
            return alert("Usuário não cadastrado , tente novamente")
        }
    })
    .then((data)=>{
        console.log(data)
    
    })
    .catch((error)=>{
        return console.log("erro na requisição" + error)
    })

    
};


//Função para acessar os valores enviados através dos inputs e retorna-los a variavel associada ao data, para ser enviada ao back a partir do fetch
    const accessData = ()=>{
        return{
                nome:document.getElementById("NomeCompleto").value,
                email:document.getElementById("email").value,
                senha:document.getElementById("senha").value,
                cep:document.getElementById("cep").value,
                logradouro:document.getElementById("logradouro").value,
                bairro:document.getElementById("bairro").value,
                localidade:document.getElementById("localidade").value,
                uf:document.getElementById("uf").value,
        }
    }


//Função que diz respeito ao envio do formulário com o evento submmit
init();


//Função que diz respeito a pegar todos os valores dos inputs e retorna-los dentro da variável data para que possa ser enviado ao backend(Atenção que a chamada dos valores dos inputs tem que condizer com o schema montando no backend)
accessData();





//Observação importante => colocar a função que o fetch está sempre como se fosse uma função assicrona e se utilizar o if lembrar de sempre colocar um return no uso de validação , tudo que for antes do return não será executado , ou seja, o return sempre por ultimo
//como é o caso que vemos na requisição de login e aqui na validação da senha e confirmar a senha



























