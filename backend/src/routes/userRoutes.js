// Config do arquivo router
const express = require("express");

const router = express.Router();

// Importação dos middlewares de validação de login , error e cadastro
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const errorMiddleware = require("../middlewares/errorMiddlewares");
// Impotação de middleware de checagem se o email criado já é cadastrado no banco de dados
const {
    checkExistingEmail,
} = require("../middlewares/repetionEmailMiddleware");
const {
    registerValidate,
    updateForgotPssword,
    updateUser,
} = require("../middlewares/userMiddleware");

router.get("/all", userController.getAll);

router.get("/:id", userController.getUserById);

router.get("/email/:id", userController.getUserByIdAndShowEmail);

router.post(
    "/create",
    registerValidate,
    checkExistingEmail,
    userController.createUser
);

router.put("/:id", updateUser, userController.updateUserById);

router.delete("/:id", userController.deleteUserById);

router.post("/login", authController.login);

router.post(
    "/RotaAutenticada",
    authController.tokenVerification,
    userController.rotaAutenticada
);

router.post("/forgotPassword", authController.forgotPassword);

router.post(
    "/resetPassword",
    updateForgotPssword,
    authController.resetPassword
);

// Importação do midlleware de error com o joi para pegar os erros que acontecer na rota de post de usuários
router.use(errorMiddleware);

module.exports = router;
