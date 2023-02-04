//Importação do pacote npm joi, usado para padronizar os campos da nossa api, protegemos a nossa api para que não seja aceite qualquer tipo de dados(Impomos condições)
const Joi = require("joi")


//Esquema Criado com o joi para impor as condições e passar para userMiddleware para ser validado e apanhado o erro caso exista algum para após passar por esse middleware , ser exportado e utilizado na rota de post para agregra estas condições

const registerSchema = Joi.object({
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            senha: Joi.string().min(3).max(10).required(),
            cep:Joi.string().required(),
            logradouro:Joi.string().required(),
            bairro:Joi.string().required(),
            localidade:Joi.string().required(),
            uf:Joi.string().required()
        
    })


    module.exports = {
        registerSchema
    }

