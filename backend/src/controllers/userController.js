// Passando o userController como objeto vazio para depois exportalo como module e utilizar ele no router
const userController = {};

// Importando modulos
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");

const { transporterGmail } = require("../mail/mailler");
const UserSchema = require("../models/userSchema");

// Rota que irá pegar todos os usuários do banco de dados cadastrados (READ - GET)
userController.getAll = (req, res) => {
    // eslint-disable-next-line func-names, array-callback-return
    UserSchema.find(function (err, users) {
        if (err) {
            res.status(500).send({ message: err.message });
        }
        res.status(200).send(users);
    });
};

// Rota que irá pegar todos os usuários pelo seu id (GET - READ.ID)
userController.getUserById = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id, req.body);

        res.status(200).json({
            statusCode: 200,
            message: "Usuário Localizado com sucesso",
            data: {
                user,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

// Rota que irá pegar o usuário pelo seu id e enviar somente o email a mensagem e o statatus code como resposta => podemos colocar muitas outras possibilidades, como selecionar o usuariário por qualquer dado que foi adicionado no banco de dados , ou pega-lo pelo id e mostrar somente o nome do usuario como retorno
userController.getUserByIdAndShowEmail = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id, req.body);

        res.status(200).json({
            statusCode: 200,
            message: "Usuário Localizado com sucesso",
            usuario: user.email,
        });
    } catch (err) {
        console.log(err);
    }
};

// Rota que irá fazer o metodo post para a criação de um novo usuário(POST) com a utilização do bcrypt( portando há duas maneiras de se utilizar o bcryptt)

userController.createUser = async (req, res) => {
    try {
        const newUser = new UserSchema(req.body);
        const variables = {
            nome: newUser.nome,
        };

        const templateFileContent = fs
            .readFileSync(
                path.join(__dirname, "../views/emails/welcomeUser.hbs")
            )
            .toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);
        const templateHtml = templateParse(variables);

        transporterGmail
            .sendMail({
                from: "joaoeudes91135538@gmail.com",
                to: newUser.email,
                subject: "Bem vindo ao crm-Lobster",
                variables,
                html: templateHtml,
            })
            .then(() => {
                console.log("Email enviado com sucesso");
            })
            .catch((err) => console.log(err));
        const savedUser = await newUser.save();

        res.status(201).json({
            statusCode: 201,
            message: "Usuário adicionado com sucesso",
            data: {
                savedUser,
            },
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: err.message,
        });
    }
};

// Rota que irá fazer update do Usuário ja existente(UPDATE - PUT)
userController.updateUserById = async (req, res) => {
    try {
        const user = await UserSchema.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.status(200).json({
            statusCode: 200,
            message: "Usuário atualizado com sucesso",
            data: {
                user,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

// Rota que irá apagar o usuário do banco de dados(DELETE)
userController.deleteUserById = async (req, res) => {
    try {
        await UserSchema.findByIdAndDelete(req.params.id);

        res.status(200).json({
            statusCode: 200,
            mensagem: "Usuário deletado com sucesso",
        });
    } catch (err) {
        res.status(400).json({
            statusCode: 400,
            message: err.message,
        });
    }
};

// Rota de validação do token com sucesso (POST) => essa será a rota em que exbirá se o token é valido ou não , ou seja , se ele existe na comparação do usuário com o banco
userController.rotaAutenticada = (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: "Rota autenticada",
    });
};

module.exports = userController;
