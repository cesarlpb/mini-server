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

// Post de ejemplo
const nuevoPost = {
  title: "Viajes a mitad de precio", 
  subtitle: "Aprende como ahorrar dinero este verano", 
  img: "playa.jpg", 
  sectionId: 1}

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

// Section de ejemplo
const nuevaSection = {
  section: "Viajes exprés en el Conte Inglés",
  order: 1
}
console.log(nuevaSection)

sequelize.sync().then(() => {
  // console.log('Tablas creadas');
  // Insertamos datos:
  Post.create(nuevoPost)
  Section.create(nuevaSection)
}).catch((error) => {
  console.error('Hubo un error: ', error);
});