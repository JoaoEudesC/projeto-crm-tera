//Middleware que impede que sejam criados usuários com o mesmo o email e mesma senha, checa se já existe o email no banco de dados, para não deixar cadastrar dois emails

const userSchema = require("../models/userSchema")


const checkExistingEmail = async(req , res , next) =>{
    const existingEmail = await userSchema.findOne({email:req.body.email})
    if(existingEmail){
        res.status(422).json({
            statusCode:422,
            message:"este Email já existe"
        })
    }

    else{
        next()
    }

}



module.exports = {
    checkExistingEmail
}


