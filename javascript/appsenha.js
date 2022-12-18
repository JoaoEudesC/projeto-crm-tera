
//seleção de elementos


let senha = document.getElementById("inlineFormInputGroupUsername")
let botaoRedefinirSenha = document.getElementById("redefinir")







//adição de evento ao botao de redefinir senha



botaoRedefinirSenha.addEventListener("click" , clicar )
function clicar(){
    alert("Enviamos um email de confirmação de senha para o email indicado")
}




//Mapeando a tecla enter para enviar o formulario

document.addEventListener('keypress' , (e)=>{
    if(e.key === 'enter')
    botaoRedefinirSenha.click();
})