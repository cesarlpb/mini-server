require('dotenv').config()
// const { Op, Sequelize, DataTypes } = require("sequelize");
const { sequelize, sincronizarTablas, Post } = require('./tables')

// Aplicación de express
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cors = require('cors') 
app.use(cors()) 

// Llamada a la fn para actualizar tablas en base de datos (descomentar para sincronizar):
// sincronizarTablas()

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Bienvenido a Express');
});

// Post
// GET de lista de posts
app.get('/posts', (req, res) => {
  Post.findAll().then(posts => {
    // Este console.log es p  ara ver los datos en consola (dataValues):
    posts.map(post => console.log(post.dataValues))
    // Response del endpoint:
    res.json(posts)
  })
});
// GET de un post por id
app.get('/posts/:id', (req, res) => {
  const id = req.params.id; // leemos el id de la url
  Post.findOne({
    where: {
      id: id
    }
  }).then( 
    post => {
      console.log(post);
      res.json(post)
    }
  )
})

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