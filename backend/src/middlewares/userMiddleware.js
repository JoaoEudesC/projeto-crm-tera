//Esquema de validação do roi , importado para passar as especificações das minhas validações , em seguida exporto este modulo para o errorMiddleware que será onde ele pegará o erro da requisição , caso tenho e jogará no corpo da requisição
//Posso montar outro schema para a validação de login e passar aqui como outro midleware e passa-lo para o errorMidleware , é necessario um esquema para cadastro e outro para login


// Middleware de validação de cadastros

const {registerSchema} = require("../Validations/user")


const registerValidate = (req , res , next)=>{
    const {error} = registerSchema.validate(req.body)
    if(error) throw error

    next()
        
    
}


//Middleware de validação de login
    const {loginSchema} = require("../Validations/user")

    const loginValidate = (req , res , next) =>{
        const {error} = loginSchema.validate(req.body)
        if(error) throw error

        next()
    }

    



module.exports = {
    registerValidate,
    loginValidate
}





