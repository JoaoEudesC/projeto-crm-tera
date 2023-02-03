//config do arquivo router
const { Router } = require("express");
const express = require("express");
const router = express.Router();

//config do pacote npm joi
const JoiValidation = require("../Validations/user")
const {validate} = require("express-validation")

//importação do Usercontroller e do AuthController
const userController = require("../controllers/userController")
const authController = require("../controllers/authController");


// 1- funções que são enviadas do controller para fazer as requisições


//Rota de Teste(GET)

router.get("/teste" , userController.Teste)


//Rota que mostra todos os usuários cadastrados no banco (GET -ALL)

router.get("/all" , userController.getAll)

//Rota que irá pegar os usuarios pelo Id (GET - READ-ID)

router.get("/:id" , userController.getUserById)

//Rota que irá pegar todos os usuários e enviar somente o email como resposta(GET -email)

router.get("/email/:id" , userController.getUserByIdAndShowEmail)

//Rota que irá adicionar usuários no banco (POST)

router.post("/", validate(JoiValidation.createOrUpadateUserValidator) ,userController.createUser)

//Rota que irá atualizar um usuário existente no banco de dados(UPDATE - PUT)

router.put("/:id" , userController.updateUserById)


//Rota que irá deletar o usuário do banco de dados (DELETE)

router.delete("/:id" , userController.deleteUserById)

//Rota de Validação do usuário através do jwt onde mostrará o token criado (POST)

router.post("/login" , authController.login)

//Rota de validação do token ja criado , para certificar se ele realmente existe ou não (POST)

router.post("/RotaAutenticada" , authController.tokenVerification , userController.rotaAutenticada )


//exportação do modulo router

module.exports = router

