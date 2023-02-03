
const Joi = require("joi")



   module.exports =  {
    
    createOrUpadateUserValidator : {
        body: Joi.object({
            NomeCompleto: Joi.string().required(),
            Email: Joi.string().email().required(),
            Password: Joi.string().min(3).max(10).required(),
            Cep:Joi.string().required(),
            Logradouro:Joi.string().required(),
            Bairro:Joi.string().required(),
            Localidade:Joi.string().required(),
            UF:Joi.string().required()
        })
    }
}



