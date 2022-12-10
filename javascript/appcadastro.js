
//seleção de elementos  
    
    //botao de cadastro
        let botao = document.getElementById("cadastro")
    
    //inputs
        let senha = document.getElementsByTagName("input")[2]
        let confirmarSenha = document.getElementsByTagName("input")[3]
        let nome = document.getElementById('floatingInput')
        let email = document.getElementById("email")
        let codigopostal = document.getElementById("cep")
        let logradouro = document.getElementById('logradouro')
        let bairro = document.getElementById('bairro')
        let localidade = document.getElementById('localidade')
        let uf = document.getElementById('uf')

// adição de evento ao botão de cadastro

    botao.addEventListener("click", clicou )



function clicou(){
    
    //adição de elemntos ao local storage
    
    let Nome = nome.value
    let Email = email.value
    let Senha =senha.value
    let ConfirmarSenha = confirmarSenha.value
    let codigoPostal = codigopostal.value
    let Logradouro = logradouro.value
    let Bairro = bairro.value
    let Localidade = localidade.value
    let UF = uf.value

    localStorage.setItem('Nome',Nome );
    localStorage.setItem('Senha' , Senha)
    localStorage.setItem('Confirmar senha' , ConfirmarSenha)
    localStorage.setItem('Email' , Email);
    localStorage.setItem('Cep' , codigoPostal);
    localStorage.setItem('Logradouro' , Logradouro);
    localStorage.setItem('Bairro' , Bairro);
    localStorage.setItem('Localidade' , Localidade)
    localStorage.setItem('UF' , UF);
    

    // conicidência de senha e confirmação de senha
    
    if(Senha === ConfirmarSenha){
    alert("Parabens, seu cadastro foi feito com sucesso")
    
    }

else{
    alert("As senhas nao coincidem, tente refazer o cadastro ")
    }

}






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


















