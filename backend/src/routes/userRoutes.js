//Config do arquivo router
const express = require("express");
const router = express.Router();

//Importação dos middlewares de validação de login , error e cadastro
const {registerValidate , updateForgotPssword , updateUser} = require("../middlewares/userMiddleware")
const errorMiddleware  = require("../middlewares/errorMiddlewares")


//Importação do Usercontroller e do AuthController
const userController = require("../controllers/userController")
const authController = require("../controllers/authController");

//Impotação de middleware de checagem se o email criado já é cadastrado no banco de dados
const {checkExistingEmail} = require("../middlewares/repetionEmailMiddleware")


//Rota que mostra todos os usuários cadastrados no banco (GET -ALL)

router.get("/all" , userController.getAll)

//Rota que irá pegar os usuarios pelo Id (GET - READ-ID)

router.get("/:id" , userController.getUserById)

//Rota que irá pegar todos os usuários e enviar somente o email como resposta(GET -email)

router.get("/email/:id" , userController.getUserByIdAndShowEmail)

//Rota que irá adicionar usuários no banco (POST)

router.post("/create", registerValidate, checkExistingEmail, userController.createUser)

//Rota que irá atualizar um usuário existente no banco de dados(UPDATE - PUT)

router.put("/:id" ,  updateUser ,userController.updateUserById)

//Rota que irá deletar o usuário do banco de dados (DELETE)

router.delete("/:id" , userController.deleteUserById)

//Rota de Validação do usuário através do jwt onde mostrará o token criado (POST) onde você pegará o token e passará na RotaAutenticada

router.post("/login" ,authController.login)

//Rota de validação do token ja criado , para certificar se ele realmente existe ou não (POST)

router.post("/RotaAutenticada" , authController.tokenVerification , userController.rotaAutenticada )

//Rota que vai enviar o email para o usuário com o token para recuperação de senha

router.post("/forgotPassword", authController.forgotPassword)

//Rota que vai resetar o password, onde eu vou passar o email cadastrado, o token e a senha nova update

router.post("/resetPassword" , updateForgotPssword, authController.resetPassword )




//Importação do midlleware de error com o joi para pegar os erros que acontecer na rota de post de usuários
router.use(errorMiddleware)


module.exports = router

