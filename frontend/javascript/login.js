//Seleção de Elementos
    let eye = document.getElementById('show_Senha')
    const Senha = document.getElementsByTagName('input')[1]
    const email = document.getElementsByTagName('input')[0].value
    const botaoLogin = document.getElementById('entrar')
    const form = document.getElementById('form')


    
    //pegando value do input de senha 
    const senha = Senha.value




//Mapeando o enter para o envio de formulário atravês do keypress
    document.addEventListener('keypress' , (e)=>{
        if(e.key === 'enter')
        botaoLogin.click();
    })



//Mapeando a tecla capslock para avisar ao usuario se a tecla está ativada ou não ao inserir a senha
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
    eye.addEventListener("click" , ()=>{
        if(Senha.type == "password"){
            Senha.type = 'text'
        }
        else{
            Senha.type = 'password'
        }
    })

//Função que adicionará os valores dos inputs no localStorage(esta função será chamada dentro da função de enviar o formulário)
    const AddLocalStorage = () =>{
        const password = document.getElementById("password").value
        const mail = document.getElementById("email").value
        localStorage.setItem("Senha" , password)
        localStorage.setItem("Email" , mail)
    }




//Autenticaçao e login => Ligação da nossa aplicação com o backend , a parte de login , da rota login, autenticação e login
    const init = () => form.addEventListener('submit' , async (e)=>{
        e.preventDefault();
        const data = accessData(); 
        const url = "http://localhost:8080/users/login"
        const MessageError = document.getElementById("MessageAlert")

        //Função que adiciona os elementos ao localStorage
        AddLocalStorage()
        
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
        
        .then((response)=>{
            if(response.status === 200){
                window.location.href = "UsuárioCadastrado.html"
            }
            else{
                return MessageError.style.display = "block"
            }
            
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
        senha: document.getElementsByTagName('input')[1].value,
        email: document.getElementsByTagName('input')[0].value
    };
};

//Chamada da função que diz respeito ao envio dos valores do inut para a variavel data que vai ser enviada ao backend através do post ( atenção os valores dos inputs tem que está associados ao schema criado no backend)
accessData();

//Chamada da função que diz respeito ao envio do formulário
init();






//Observação importante => O que vier depois de um return não será executado , por isso em uma função if coloque o return por ultimo e as funções a serem executadas primeiro , como vimos no caso do primeiro .then e na validação de confirmação de senha do cadastro
//Repare que utilizamos uma função if dentro do then , para fazer a validação do usuário baseado no statusCode, podemos fazer isso no cadastro tbm 


























