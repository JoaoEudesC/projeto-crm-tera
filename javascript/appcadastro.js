
//seleção de elementos


let senha = document.getElementsByTagName("input")[2]
let confirmar = document.getElementsByTagName("input")[3]
let botao = document.getElementById("cadastro")





// adição de evento ao botão de cadastro




botao.addEventListener("click", clicou )

function clicou(){
    let n1 = senha.value
    let n2 = confirmar.value

    if(n1 === n2){
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
        console.log("erro gravissimo " + e)
    })
    
}) 
















