

//Mapeando a tecla enter para enviar o formulario
const botaoCadastro = document.getElementById("cadastro")
    document.addEventListener('keypress' , (e)=>{
        if(e.key === 'enter')
        botaoCadastro.click();
    })


//Mapeando a tecla capslock para avisar ao usuario se a tecla está ativada ou não ao inserir a senha
let senha = document.getElementsByTagName("input")[2]
    senha.addEventListener('keyup' , (e)=>{
        const textoAlerta = document.getElementById('capsLock')
        if(e.getModifierState('CapsLock')){
            textoAlerta.style.display = 'block'
        }
        else{
            textoAlerta.style.display ='none'
        }
    })
    
let confirmarSenha = document.getElementsByTagName("input")[3]
    confirmarSenha.addEventListener('keyup' , (e)=>{
        const uperCaseConfirm = document.getElementById('capsLockConfirm')
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

















//criação da função de submeter o formulário para o backend

const form = document.getElementById('form')
const init = () => form.addEventListener('submit' , async (e) =>{
    e.preventDefault()
    let senha = document.getElementById("senha")
    let confirm = document.getElementById("confirmarSenha").value
    let valueSenha = senha.value
    let MessageError = document.getElementById("MessageError")

    if(valueSenha != confirm){
        valueSenha = ""
        confirm = ""
        senha.focus()
        return MessageError.style.display = "block"
    }
    
    const data = accessData();
    const url = "http://localhost:3333/users/create"
    if(!data){
        return console.log("Dados não estão corretos")
    }

    const existingEmailMessage = document.getElementById("MessageEmailExist")

    const Fetch = {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "content-Type": "application/json"
        },
        credentials: "same-origin"
    }


    await fetch(url , Fetch)
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        if(data.statusCode !== 201){
            return existingEmailMessage.style.display = "Block"
        }
        else{
            const email = document.getElementsByTagName("input")[1].value
            alert(`Usuário cadastrado com sucesso, Enviamos um email para ${email}`)
            return window.location.href = "indexlogin.html"
        }
    })
    .catch(error => {
        console.log("Erro na sua requisição " + error)
    })
    

})



const accessData = ()=>{
        return{
                nome:document.getElementById("NomeCompleto").value,
                email:document.getElementsByTagName("input")[1].value,
                senha:document.getElementById("senha").value,
                cep:document.getElementById("cep").value,
                logradouro:document.getElementById("logradouro").value,
                bairro:document.getElementById("bairro").value,
                localidade:document.getElementById("localidade").value,
                uf:document.getElementById("uf").value,
        }
    }





accessData();

init();
































