// Configuraçaão dos modulos do pacote express e cors
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors());


require("dotenv").config()
const port = process.env.PORT
console.log(port)

//Arquivo de router para que a gente possa utilizar o metodo de routes no projeto
const router = require("./routes/userRoutes")
app.use(express.json())


//Arquivo de conexão com o banco de dados
const db = require("./config/database")
db.connect();




//Aplicando metodo para poder utilizar o router e definir qual será a rota principal do meu projeto
app.use(router)
app.use("/users" , router)

//Teste de envio de email app.js (Utilizar amanhã para terminar a validação)
/*const nodemailer = require("nodemailer")

const  transporter = nodemailer.createTransport({
    host:'smtp.office365.com',
    port: '587',
    secure:false,  // o secure ela é true para a porta 465 , false para as outras
    auth: {
      user: 'joaoeudes91135538@hotmail.com',
      pass: 'Hadassa2609'
    }
  });


  transporter.sendMail({
    from:` manual do dev <joaoeudes91135538@hotmail.com>`,
    to:'joaoeudes25012000@hotmail.com',
    subject:'Enviando email com Nodemailer',
    html:'<h1> Olá , dev! </h1> <p>Este email foi enviado utilizando o nodemailler</p>',
    text:'Olá esse é o texto Alternativo'            //Posso passar uma lista de emails se eu quiser, separados por virgula, mas vou passar só um
  })

  .then(() => console.log('Email enviado com sucesso'))
  .catch(err => console.log("erro ao enviar email "+ err))*/





module.exports = app;