require('dotenv').config()
const { truncate } = require('fs');
const { Op, Sequelize, DataTypes } = require("sequelize");
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

// Array de posts
const posts = [
  {
    title: "Viaje a Roma",
    subtitle: "Pizzas al mejor precio",
    img: "roma.png",
    sectionId: 1
  },
  {
    title: "Viaje a Toledo",
    subtitle: "Toletum y buen acero",
    img: "toledo.jpg",
    sectionId: 1
  },
  {
    title: "Viaje a Salamanca",
    subtitle: "Hay ranas",
    img: "salamanca.jpg",
    sectionId: 1
  },
  {
    title: "Viaje a Uganda",
    subtitle: "Hay gente y no nieva (por ahora)",
    img: "uganda-forever.jpg",
    sectionId: 1  
  },
  {
    title: "Roma 2",
    subtitle: "Pizzas 2",
    img: "roma.png",
    sectionId: 2
  },
  {
    title: "Toledo 2",
    subtitle: "Toletum",
    img: "toledo.jpg",
    sectionId: 2
  },
  {
    title: "Salamanca 2",
    subtitle: "",
    img: "salamanca.jpg",
    sectionId: 2
  },
  {
    title: "Uganda 2",
    subtitle: "",
    img: "uganda-forever.jpg" ,
    sectionId: 2
  },
  {
    title: "10 tips para ir a la playa",
    subtitle: "Playa playa playa",
    img: "playa.jpg",
    sectionId: 3
  },
  {
    title: "10 trucos para hacer la maleta",
    subtitle: "",
    img: "maleta.jpg",
    sectionId: 3
  },
  {
    title: "3 tips para viajar en coche",
    subtitle: "No te dejes el bocadillo",
    img: "car.jpg",
    sectionId: 3
  }
]

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
const sections = [
  {
    section: "Últimos Posts",
    order: 1
  },
  {
    section: "Guías",
    order: 2
  },
  {
    section: "Tips",
    order: 3
  },
  {
    section: "Sección sin contenido",
    order: 4
  }
]


sequelize.sync().then(() => {
  // console.log('Tablas creadas');
  // Insertamos datos:
  
  // Post.bulkCreate(sections)
  // Section.bulkCreate(sections)

}).catch((error) => {
  console.error('Hubo un error: ', error);
});