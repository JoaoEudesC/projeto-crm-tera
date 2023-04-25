//Importação dos modulos
const userSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const {transporterHotmail, transporterGmail} = require("../mail/mailler")

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
                    message:"Usuário não autorizado",
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
            const token = jwt.sign({nome:usuário.nome} , SECRET , {expiresIn:"1d"})
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

//Função de verificação do token , é um midleware => você vai passar a função por ela antes de ir para a função inicial , ou seja , antes de ele passar pela função de criar usuário , ele vai passar pela função de verificar token(Ou seja , eu poderia ter criado essa função, na pasta de middlewares)
    authController.tokenVerification = (req , res , next)=>{
        const tokenHeader = req.headers["authorization"]
        const token = tokenHeader && tokenHeader.split("  ")[1]; 

        if(!tokenHeader){
            return res.status(400).json({
                statusCode:400,
                message:"Token missing" 
            })
        }


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







//Função de Recuperação de senha onde enviarei um email com um token ou link para que o usuário possa fazer um update na senha
    authController.forgotPassword = async(req, res) => {
        const {email} = req.body;
        try {
            const user = await userSchema.findOne({email});
            if (!user) {
            return res.status(400).json({error: 'User not found'});
            }


            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);


            user.passwordResetToken = token;
            user.passwordResetExpires = now;  
            await user.save();


        transporterGmail.sendMail({
            from:"joaoeudes91135538@gmail.com",
            to:email,
            subject:'Recuperação de senha',
            html:`<p>Esqueceu a senha?, não tem problema utilize o token enviado para redefinir a senha, o token expira dentro de 1 hora.</p>  <br></br> <p>token: ${token}</p>`,
            text:`Esqueceu a senha?, não tem problema utilize o token enviado para redefinir a senha. o token expira dentro de 1 hora. ${token}`
        })
        .then(() => {console.log("Email enviado com sucesso")})
        .catch(err => console.log(err))
            res.status(200).json({
            statusCode:200,
            message:"Token enviado com sucesso, cheque sua caixa de email"
        })
        } catch (error) {
            res.status(400).json({error: 'Erro on forgot password, try again'});0
        }
    }



//Função de reset de password onde o usuário vai enviar o token, email e senha na requisição( A senha a ser enviada será a senha nova que o usuário quer enviar)
    authController.resetPassword = async(req , res) =>{
        const {email , passwordResetToken , senha} = req.body; //o que eu vou receber na minha requisição, que no caso é o meu token, senha e email

        try {

            const user = await userSchema.findOne({email})
            
            .select('+passwordResetToken passwordResetExpires')
            
            if(!user){
                return res.status(400).json({error:'User not found'})
            }
            
            if(passwordResetToken !== user.passwordResetToken){
                return res.status(400).json({error: 'Token invalid'})
            }  

            
            const now = new Date();
            if(now > user.passwordResetExpires){
                return res.status(400).json({error: 'Token expired, generate a new one'}) 
            }

            user.senha = senha;
            await user.save()

            res.status(200).json({
                message:"Senha atualizada com sucesso",
                statusCode:200
            })


        } catch (error) {
            res.status(400).send({error: 'Cannot reset password, try again' + error})
        }
    };

    
    


    

        

    


module.exports = authController


