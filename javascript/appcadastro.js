
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
        var emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
        
    //Formulario
        const form = document.getElementById('Form')
    
    






//Pegando os values de cada input
    let Nome = nome.value
    let Email = email.value
    let Senha =senha.value
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
        localStorage.setItem('Nome',nome );
        localStorage.setItem('Senha' , senha)
        localStorage.setItem('Confirmar senha' , confirmarSenha)
        localStorage.setItem('Email' , email);
        localStorage.setItem('Cep' , codigoPostal);
        localStorage.setItem('Logradouro' , logradouro);
        localStorage.setItem('Bairro' , bairro);
        localStorage.setItem('Localidade' , localidade)
        localStorage.setItem('UF' , uf);
    
    
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
            fetch( `https://viacep.com.br/ws/${search}/json/`,options)
            .then(response => {
            response.json()
            .then(data=>{
                console.log(data)
                showdata(data)
            })
        })
    
        .catch(e=>{ 
            console.log("Falha de conexão " + e)
        })
    
    }) 


console.log(Nome)















