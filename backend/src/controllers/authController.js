//Importação dos modulos
const userSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const {transporterHotmail} = require("../mail/mailler")








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







    //Função de Recuperação de senha onde enviarei um email com um token ou link para que o usuário possa fazer um update na senha
    authController.forgotPassword = async(req, res) => {
        const {email} = req.body;
        try {
          const user = await userSchema.findOne({email});
          if (!user) {
            return res.status(400).send({error: 'User not found'});
          }
          
          //Criação do token com tempo de expiração de 1hora
          const token = crypto.randomBytes(20).toString('hex');
          const now = new Date();
          now.setHours(now.getHours() + 1);
      
          // Atualiza os campos passwordResetToken e passwordResetExpires no banco de dados , eles são adicionados ao banco de dados para que eu consiga, comparar o token que eu enviei por email com o id do usuário e ver se esta chave token foi gerada no banco
          user.passwordResetToken = token;
          user.passwordResetExpires = now;  //Aqui eu tbm poderia utilizar o await userSchema.findByIdAndUpdate(user.id,{'$set':{passowrdResetToken: token , passwordResetExpires:now}}) que é uma forma nativa do mongoose para acessar os campos do schema em uma função, mas neste caso eu fiz direto sem precisar utilizar o update, sempre que fizer a requisição aqueles campos vão ser alterados
          await user.save();
          
          //Envio do token de recuperação de senha por email para o usuário
          transporterHotmail.sendMail({
            from:"joaoeudes91135538@hotmail.com",
            to:email,
            subject:'Recuperação de senha',
            html:`<p>Esqueceu sua senha?, não tem problema, utilize este token ${token}</p><br></br><p> O token expira em 1 hora </p>`,
            text:'Olá esse é o texto Alternativo'
        })
          .then(() => res.send("Email enviado com sucesso, cheque a caixa de email"))
          .catch(err => res.send("Erro ao enviar o email, por favor cheque o seu código " + err))
        } catch (error) {
            res.status(400).send({error: 'Erro on forgot password, try again'});0
        }
    }



    //Função de reset de password onde o usuário vai enviar o token, email e senha na requisição( A senha a ser enviada será a senha nova que o usuário quer enviar)

    authController.resetPassword = async(req , res) =>{
        const {email , token , senha} = req.body; //o que eu vou receber na minha requisição, que no caso é o meu token, senha e email

        try {
            //Preciso verificar se este usuário existe, buscando o usuário primeiro
            const user = await userSchema.findOne({email})
            //Preciso pegar os campos que estão no select, porque por padrão ele não vem no corpo da requisição(Essa é uma configuração própria do mongoose mesmo)
            .select('+passwordResetToken passwordResetExpires')
            //Verificar se o usuário não existe
            if(!user){
                return res.status(400).send({error: 'User not found'})
            }
            //Se ele existe eu vou verificar se o token existe
            if(token !== user.passwordResetToken){
                return res.status(400).send({error: 'Token invalid'})
            }  //Estou verificando se o token que está sendo enviado na requisição e o token gerado enviado no email são iguais(estou vendo se um é diferente do outro)

            //Se o token existe e bate com o enviado ao usuário, eu preciso ter certeza se ele ainda não está expirado por uma hora
            const now = new Date();
            if(now > user.passwordResetExpires){
                return res.status(400).send({error: 'Token expired, generate a new one'}) //se  a data atual for maior do que a hora de expiração do token, vai gerar um erro
            }

            //Depois de passar por todas as verificações, se der tudo certo, eu tenho que atualizar a senha do usuário
            //Como neste caso eu utilizo o hash do bcrypt através de um middleware la no meu model para hashear a senha antes de salvar, eu não preciso, hashear a senha denovo, a não ser que eu utilizasse diretamante na função de post
            user.senha = senha;
            await user.save()

            //Resposta , se der tudo certo se passar por todas as verificações
            res.send()


        } catch (error) {
            res.status(400).send({error: 'Cannot reset password, try again'})
        }
    };

    
    


    

        

    


module.exports = authController


