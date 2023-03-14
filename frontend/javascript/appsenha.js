
//Mapeando a tecla enter para enviar o formulario
document.addEventListener('keypress' , (e)=>{
    if(e.key === 'enter')
    botaoRedefinirSenha.click();
})



//Ligação da nossa api com o frontEnd para enviar as instruções de recuperação de senha para o usuário