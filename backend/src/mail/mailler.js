require("dotenv").config()
const nodemailer = require("nodemailer")

const user = process.env.user
const pass = process.env.pass

//Esta configuração é somente pra quem quer utilizar as versoes de email hotmail ou outlook , se for para utilizar gmail é preciso => entrar no smtp do gmail igual a gente entrou no smtp do hotmail pra pegar as mesmas informções, mas é preciso fazer um passinho a mais(Tomar cuidado com o nodemon, se não ele vai ficar enviando vários emails quando você utilizar o refresh na página)

//Passos a mais para enviar no gamail => o google ele é mais seguro, sendo assim , como voce está tentando acessar uma senha por terceiros , um app, a senha não é do seu gmail, sendo assim você vai ter que criar uma senha especifica para esse app para utilizar
//1 - entrar em segurança na sua conta google
//2 - selecionar palavra passe de app e criar e ele vai gerar esta senha que eu utilizei ali
const  transporter = nodemailer.createTransport({
    host:'smtp.office365.com',
    port: 465,
    secure:true,  // o secure ela é true para a porta 465 , false para as outras
    auth: {
      user: 'joaoeudes91135538@gmail.com',
      pass: 'ewckfrrownsvzpcc'
    }
  });


  

  
  transporter.sendMail({
    from:`joaoeudes91135538@hotmail.com`,
    to:'joaoeudes25012000@hotmail.com',
    subject:'Enviando email com Nodemailer',
    html:'<h1> Olá , dev! </h1> <p>Este email foi enviado utilizando o nodemailler</p>',
    text:'Olá esse é o texto Alternativo'            //Posso passar uma lista de emails se eu quiser, separados por virgula, mas vou passar só um
  })

  .then(() => console.log('Email enviado com sucesso'))
  .catch(err => console.log("erro ao enviar email "+ err))

  
  
  module.exports = {transporter}
