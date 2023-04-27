const Joi = require("joi")


//Esquema Criado com o joi para impor as condições e passar para userMiddleware para ser validado e apanhado o erro caso exista algum para após passar por esse middleware , ser exportado e utilizado na rota de post para agregra estas condições

const registerSchema = Joi.object({
    
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            senha: Joi.string().min(3).max(20).required(),
            cep:Joi.string().required(),
            logradouro:Joi.string().required(),
            bairro:Joi.string().required(),
            localidade:Joi.string().required(),
            uf:Joi.string().required()
        
    })


//Schema de validação da senha para a utilização do update na recuperação de senha com o token

const updateForgotPassword = Joi.object({
    senha:Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    passwordResetToken: Joi.string().max(50).required()
})

//Schema para a rota de update
const UpdateSchema = Joi.object({
    name: Joi.string(),
    email:Joi.string().email(),
    password:Joi.string().min(3).max(20)
})


    
    module.exports = {
        registerSchema,
        updateForgotPassword,
        UpdateSchema
        
    }

