const nodemailer = require("nodemailer");

// Transporter para o email do gmail
const transporterGmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // o secure ela é true para a porta 465 , false para as outras
    auth: {
        user: "joaoeudes91135538@gmail.com",
        pass: "ymcyeljhwqqrwauq",
    },
});

// Transporter para o email do hotmail
const transporterHotmail = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    secure: false, // o secure ela é true para a porta 465 , false para as outras
    auth: {
        user: "joaoeudes91135538@hotmail.com",
        pass: "Hadassa2609",
    },
});

module.exports = { transporterGmail, transporterHotmail };
