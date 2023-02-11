
var count = 10
setInterval(function(){
    count--;
    document.getElementById('countDown').innerHTML = `Você será redirecionado para a pagina inicial em ${count} segundos`;
    if (count == 0) {
        window.location = 'https://joaoeudesc.github.io/projeto-crm-tera'; 
    }
},1000)