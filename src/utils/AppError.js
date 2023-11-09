class AppError {
  message;
  statusCode;

  //Toda classe tem acesso ao método construtor. Carregado automaticamente quando a classe é instanciada. Toda vez que for instanciada eu quero saber do message e statusCode
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
