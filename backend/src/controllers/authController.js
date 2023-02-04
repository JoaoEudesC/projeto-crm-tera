//Importação dos modulos
const userSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
        userSchema.findOne({email:req.body.email},   (error , usuario) =>{


            if(!usuario){
                return res.status(401).json({
                    statusCode:401,
                    message:"Usuário não encontrado",
                    data:{
                        email:req.body.email
                    }
                })
            }
            //Validação de Senha

            const ValidationPassword =  bcrypt.compare(req.body.senha , usuario.senha)
            
            if(!ValidationPassword){
                return res.status(401).json({
                    statusCode:401,
                    message:"Usuário não autorizado"
                })
            }
            
            //Criação de token
            
            const token = jwt.sign({nome:usuario.nome} , SECRET)
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





module.exports = authController


//Podemos utilizar estas duas maneiras de exportação , a ultima é a mais recente , tbm utilizada no react tem que estar com o type:esmodule

/*export default  {
    authController
}*/


//Tenho que importar este arquivo no userController e criar uma rota para esta função com o metodo post , que é para onde eu enviarei os dados