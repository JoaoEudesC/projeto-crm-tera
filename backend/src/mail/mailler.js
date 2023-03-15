const dotenv = require("dotenv")
dotenv.config()
const nodemailer = require("nodemailer")


//Utilização do dotEnv para esconder dados sensiveis
const userHotmail = process.env.userHotmail
const passHotmail = process.env.passHotmail
const userGmail = process.env.userGmail
const passGmail = process.env.passGmail


//Transporter para o email do gmail
const  transporterGmail = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure:true,  // o secure ela é true para a porta 465 , false para as outras
    auth: {
      user: "joaoeudes91135538@gmail.com",
      pass: "ewckfrrownsvzpcc"
    }
  });


//Transporter para o email do hotmail
const  transporterHotmail = nodemailer.createTransport({
    host:'smtp.office365.com',
    port: '587',
    secure:false,  // o secure ela é true para a porta 465 , false para as outras
    auth: {
      user: "joaoeudes91135538@hotmail.com",
      pass: "Hadassa2609"
    }
  });


  


  //A configuração do email e do gmail é so voltada para a permissão para enviar email através do app, ou seja , eu configuro para ter um email raiz para enviar emails, mas eu posso enviar do hotmail para o gmail e do gmail para o hotmail(Neste caso eu optei pelo hotmail)
module.exports = {transporterGmail , transporterHotmail }
