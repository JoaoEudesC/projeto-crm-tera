//Configuração do middleware de error , para ativar uma mensagem de erro caso o esquema de validação do joi , (localizado no validations user.js) não seja respeitado, as mensagens são automaticas do joi através da função isError.

const Joi = require("joi")

const errorMiddleware = (err, req ,res , next)=>{
console.log(req.body)
if(Joi.isError(err)){
    return res.status(400).json({
        message:err.message

    })
    
}

else{
    return res.status(500).json({
        message:"Server Error"
    })
}

}


module.exports = errorMiddleware



//Esta função é exportada no final das rotas com o route.use , para que no final das requisições ele seja ativado e como é o ultimo middleware do código não é preciso passar o next para seguir adiante