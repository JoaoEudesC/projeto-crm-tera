//Importação dos modulos
const userSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")




//Confing do dotenv 
require("dotenv").config();


//Transformando o authController em um objeto vázio , para depois exportalo como modulo e utilizar no router
const authController = {}





//Utilização do dotenv para guardar o secret que será usado para hashear o nosso token
const SECRET = process.env.SECRET


//Fazendo o login
authController.login =  ( req , res) =>{
    try{
        //Validação de email
        userSchema.findOne({email:req.body.email},   ( error ,usuário) =>{

            console.log(usuário)
            if(!usuário){
                return res.status(401).json({
                    statusCode:401,
                    message:"Usuário não encontrado",
                    data:{
                        email:req.body.email
                    }
                })
            }
            console.log(usuário)
            //Validação de Senha

            const ValidationPassword =  bcrypt.compareSync(req.body.senha , usuário.senha)
            
            if(!ValidationPassword){
                return res.status(401).json({
                    statusCode:401,
                    message:"Usuário não autorizado"
                })
            }
            
            //Criação de token
            
            const token = jwt.sign({nome:usuário.nome} , SECRET)
            res.status(200).json({
                statusCode:200,
                message:"Login realizado com sucesso!",
                data:{
                    token
                }
            })
            
            

        })

    } catch(error){
        console.error(error)
        res.status(500).json({
            statusCode:500,
            message: error.message
        })
    }
};

//Função de verificação do token , é um midleware => você vai passar a função por ela antes de ir para a função inicial , ou seja , antes de ele passar pela função de criar usuário , ele vai passar pela função de verificar token

    authController.tokenVerification = (req , res , next)=>{
        const tokenHeader = req.headers["authorization"]
        const token = tokenHeader && tokenHeader.split(" ")[1];


        if(!token){
            return res.status(401).json({
                statusCode:401,
                message:"Não autorizado"
            })
        }
        
        try{
            jwt.verify(token , SECRET)
            next()




        }catch(error){
            console.error(error);
            res.status(500).json({
                statusCode:500,
                message:"token não valido"
            })
        }
    }







    //Função de Recuperação de senha(Usapo para o usuário se esquecer a senha poder recupera-la)(Fiz uma outra forma diferente do diego que tbm resultou , que é este caso aqui)
    authController.forgotPassword = async(req , res) =>{
      const {email} = req.body
      try {
        const user = await userSchema.findOne({email});
        if(!user){
          return res.status(400).send({error: 'User not found'})
        }


        //Geração de token a ser enviado para o email e seu tempo de expiração que eu vou salvar no models

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);


        //Alterar o usuário que a gente gerou o token

        await userSchema.findByIdAndUpdate(user.id , {
          //O set eu utilizo para dizer quais campos eu vou setar, de acordo com o meu Schema
          '$set':{
            passwordResetToken:token,
            passwordExpireToken:now
          }
        })
        //da um console.log para fazer um teste, para ver se o token e a data está chegando na requisição até este momento está tudo funcionando, o token está sendo enviado no console com a data
        console.log(token , now)

        //Enviando ao usuário um email para ele acessar algum link ou um token para conseguir atualizar a senha
            
      } catch (error) {
        res.status(400).send({error: 'Erro on forgot password, try again'})
      }
    }
    
    


    

        

    


module.exports = authController


