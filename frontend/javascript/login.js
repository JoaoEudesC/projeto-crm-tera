
    
//Mapeando o enter para o envio de formulário atravês do keypress
const form = document.getElementById('form')
    document.addEventListener('keypress' , (e)=>{
        if(e.key === 'enter')
        form.onsubmit();
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
let eye = document.getElementById('show_Senha')
    eye.addEventListener("click" , ()=>{
        if(Senha.type == "password"){
            Senha.type = 'text'
        }
        else{
            Senha.type = 'password'
        }
    })

//Função que ativará o input checkBox para que o usário possa salvar o valor do seu email e sua senha
    //Verificação quando a página é carregada se há dados do usuário salvos no localstorage, podemos fazer isso através do DOMContentLoaded(com essa função if eu estou dizendo basicamente que se tiver um password e um email no localStorage eu vou pegar os valores dos inputs e passar lá, como o checkBox marcado true) => primeira validação
    document.addEventListener("DOMContentLoaded" , () =>{
        if(localStorage.getItem("email") && localStorage.getItem("password")){
            document.getElementsByTagName("input")[0].value = localStorage.getItem("email");
            document.getElementsByTagName("input")[1].value = localStorage.getItem("password")
            document.getElementById("Check1").checked = true;
        }
    });

//Adicionando evento de change no input checkBox para verificar se ele ta marcado ou não( se ele estiver marcado salvo os valores do email e senha no localstorage se não estiver eu removo os valores do localstorage)
    let checkBox = document.getElementById("Check1")
    let inputEmail = document.getElementById("email")
    let inputSenha = document.getElementById("password")

    checkBox.addEventListener("change" , () =>{
        if(checkBox.checked){
            localStorage.setItem("email" , inputEmail)
            localStorage.setItem("password" , inputSenha)
        }
        else{
            localStorage.removeItem("email")
            localStorage.removeItem("password")
        }
    })




//Autenticaçao e login => Ligação da nossa aplicação com o backend , a parte de login , da rota login, autenticação e login

    const init = () => form.addEventListener('submit' , async (e)=>{
        e.preventDefault();
        const data = accessData(); 
        const url = "http://localhost:8080/users/login"
        const MessageError = document.getElementById("MessageAlert")

        
        
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


























