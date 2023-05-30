// Importação dos modulos
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fs = require("fs");
const handlebars = require("handlebars");
const jwt = require("jsonwebtoken");
const path = require("path");

const { transporterGmail } = require("../mail/mailler");
const userSchema = require("../models/userSchema");

require("dotenv").config();

const authController = {};

const { SECRET } = process.env;

// Fazendo o login
authController.login = (req, res) => {
    try {
        // Validação de email
        // eslint-disable-next-line consistent-return
        userSchema.findOne({ email: req.body.email }, (error, usuário) => {
            if (!usuário) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "Usuário não autorizado",
                    data: {
                        email: req.body.email,
                    },
                });
            }
            // Validação de Senha
            const ValidationPassword = bcrypt.compareSync(
                req.body.senha,
                usuário.senha
            );

            if (!ValidationPassword) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "Usuário não autorizado",
                });
            }

            // Criação de token
            const token = jwt.sign({ nome: usuário.nome }, SECRET, {
                expiresIn: "1d",
            });
            res.status(200).json({
                statusCode: 200,
                message: "Login realizado com sucesso!",
                data: {
                    token,
                },
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }
};

// Midleware de validação do token, optei por deixar aqui e não na pasta de middlewares

// eslint-disable-next-line consistent-return
authController.tokenVerification = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if (!tokenHeader) {
        return res.status(400).json({
            statusCode: 400,
            message: "Token missing",
        });
    }

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "Não autorizado",
        });
    }

    try {
        jwt.verify(token, SECRET);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: "token não valido",
        });
    }
};

// Função de Recuperação de senha onde enviarei um email com um token ou link para que o usuário possa fazer um update na senha
// eslint-disable-next-line consistent-return
authController.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const token = crypto.randomBytes(20).toString("hex");
        const now = new Date();
        now.setHours(now.getHours() + 1);

        user.passwordResetToken = token;
        user.passwordResetExpires = now;
        await user.save();

        const variables = {
            nome: user.nome,
            token: user.passwordResetToken,
        };

        const templateFileContent = fs
            .readFileSync(
                path.join(__dirname, "../views/emails/forgotPassword.hbs")
            )
            .toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);
        const templateHtml = templateParse(variables);

        transporterGmail
            .sendMail({
                from: "joaoeudes91135538@gmail.com",
                to: email,
                subject: "Recuperação de senha",
                variables,
                html: templateHtml,
            })
            .catch((err) => {
                throw new Error(err);
            });
        res.status(200).json({
            statusCode: 200,
            message: "Token enviado com sucesso, cheque sua caixa de email",
        });
    } catch (error) {
        res.status(400).json({ error: "Erro on forgot password, try again" });
    }
};

// Função de reset de password onde o usuário vai enviar o token, email e senha na requisição( A senha a ser enviada será a senha nova que o usuário quer enviar)
// eslint-disable-next-line consistent-return
authController.resetPassword = async (req, res) => {
    const { email, passwordResetToken, senha } = req.body; // o que eu vou receber na minha requisição, que no caso é o meu token, senha e email

    try {
        const user = await userSchema
            .findOne({ email })

            .select("+passwordResetToken passwordResetExpires");

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (passwordResetToken !== user.passwordResetToken) {
            return res.status(400).json({ error: "Token invalid" });
        }

        const now = new Date();
        if (now > user.passwordResetExpires) {
            return res
                .status(400)
                .json({ error: "Token expired, generate a new one" });
        }

        user.senha = senha;
        await user.save();

        res.status(200).json({
            message: "Senha atualizada com sucesso",
            statusCode: 200,
        });
    } catch (error) {
        res.status(400).send({
            error: `Cannot reset password, try again${error}`,
        });
    }
};

module.exports = authController;
