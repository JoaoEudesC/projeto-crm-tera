//Esquema de validação do roi , importado para passar as especificações das minhas validações , em seguida exporto este modulo para o errorMiddleware que será onde ele pegará o erro da requisição , caso tenho e jogará no corpo da requisição
//Posso montar outro schema para a validação de login e passar aqui como outro midleware e passa-lo para o errorMidleware , é necessario um esquema para cadastro e outro para login


//Middleware de validação de cadastros, este schema esta vindo do validations user.js
const {registerSchema , updateForgotPassword} = require("../Validations/user")


const registerValidate = (req , res , next)=>{
    const {error} = registerSchema.validate(req.body)
    if(error) throw error

    next()
        
    
}

//Middleware de validação de senha para realizar o upadate na validação de senha
const updatePssword = (req , res , next) =>{
    const {error} = updateForgotPassword.validate(req.body)
    if(error) throw error
    next()
}





    



module.exports = {
    registerValidate,
    updatePssword
    
}





