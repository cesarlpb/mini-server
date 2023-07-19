require('dotenv').config()
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
 process.env.DB_NAME,
 process.env.DB_USER,
 process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

const Post = sequelize.define("posts", {
  title: {
    type: DataTypes.STRING(75),
    allowNull: false, 
  },
  subtitle: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const Section = sequelize.define("sections", {
   section: {
     type: DataTypes.STRING(100),
     allowNull: false
   },
   order: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
   }
});

// sequelize.authenticate().then(() => {
//   console.log('Hemos conectado a la base de datos.');
// }).catch((error) => {
//   console.error('Ha habido un error: ', error);
// });

sequelize.sync().then(() => {
  console.log('Tablas creadas');
}).catch((error) => {
  console.error('Hubo un error: ', error);
});