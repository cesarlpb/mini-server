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
// import { posts } from './data/posts';
// import { sections } from './data/sections';

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

// sequelize.sync().then(() => {
  
// }).catch((error) => {
//   console.error('Hubo un error: ', error);
// });

// Aplicación de express

const express = require('express');
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cors = require('cors') 
app.use(cors()) 

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h2>Hola desde Express</h2>');
});

// Post
app.get('/posts', (req, res) => {
  // Post.findAll() ...
  res.json("posts")
});

app.post('/posts', (req, res) => {
  let nuevoPost = req.body 
  // posts.push(nuevoPost)
  // Post.create(nuevoPost) ...
  res.status(201).json("nuevoPost")
});

const PORT = 3000
app.listen(PORT, () => {
  console.log("Servidor en ejecución en http://localhost:" + PORT)}
);