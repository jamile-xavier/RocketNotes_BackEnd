const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

//importação de controllers
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");

//importação do middleware de autenticação
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

// instanciar os controllers
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
//patch atualizar um arquivo, put atualizar vários arquivos
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

//exportar o arquivo para ser usado pela API
module.exports = usersRoutes;
