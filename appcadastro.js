
console.log("estou funcionando ")


let senha = document.getElementsByTagName("input")[2]
let confirmar = document.getElementsByTagName("input")[3]
let botao = document.getElementById("cadastrar")

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





















