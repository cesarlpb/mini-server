const posts = require('./data/posts');
const sections = require('./data/sections');
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

// Definición de tabla "posts"
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
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
// Definición de tabla "sections"
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
// Definición de tabla "users"
const User = sequelize.define("users", {
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  bio: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "user"
  },
  profilePicture: {
    type: DataTypes.STRING(),
    allowNull: true
  }
})

// Función que sincroniza las tablas
const sincronizarTablas = () => {
  sequelize.sync({force: true}).then(() => {
    // IDEA: if que verifica si las tablas existen o si tienen datos...
    User.create({
      fullName: "Pepe Le Rana",
      bio: "Croac croac!",
      username: "pepe-le-rana",
      rol: "author", // user < author < admin
      profilePicture: "https://ichef.bbci.co.uk/news/800/cpsprodpb/93B3/production/_91411873_14370347_1655937074697157_8607714744240888925_n.png"
    })
    sequelize.truncate() // CHECK -> se queda pescando
    Post.bulkCreate(posts.posts) // Resolver ._.
    Section.bulkCreate(sections.sections)
    console.log("Tablas actualizadas")
  }).catch((error) => {
    console.error('Hubo un error: ', error);
  });
}

module.exports = { sequelize, sincronizarTablas, Post, Section };