require("dotenv/config");

//importação express async errors
require("express-async-errors");

//importação de migrations
const migrationsRun = require("./database/sqlite/migrations");

//importação AppError
const AppError = require("./utils/AppError");

const uploadConfig = require("./configs/upload");

//importação do express
const express = require("express");
const cors = require("cors");
//importação das rotas
const routes = require("./routes");

//inicialização de migrations
migrationsRun();

//inicialização do express
const app = express();
app.use(cors());

//informando a API em qual formato a requisição será recebida
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

//utilizção das rotas
app.use(routes);

app.use((error, request, response, next) => {
  //erro cliente
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.error(error);

  //erro servidor
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// Informar ao express a porta que será utilizada
const PORT = /*process.env.SERVER_PORT ||*/ 3333;
//Mensagem que aparecerá ao iniciar a aplicação
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
