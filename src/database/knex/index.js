//importação das configurações
const config = require("../../../knexfile");

//importação do knex
const knex = require("knex");

const connection = knex(config.development);

module.exports = connection;
