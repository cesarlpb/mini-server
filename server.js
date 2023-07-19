require('dotenv').config()
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 process.env.DB_NAME,
 process.env.DB_USER,
 process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

sequelize.authenticate().then(() => {
  console.log('Hemos conectado a la base de datos.');
}).catch((error) => {
  console.error('Ha habido un error: ', error);
});