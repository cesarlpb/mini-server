const fs = require('fs');
const path = require('path');
const multer  = require('multer'); // subida de archivos
// ----- Subida de imágenes -----
// Carpeta media en la misma ubicación que server.js
const mediaPath = path.join(__dirname, 'media');
// Crear directorio media si no existe
if(!fs.existsSync(mediaPath)){
  fs.mkdirSync(mediaPath)
}
// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'media/')
  },
  filename: function (req, file, cb) {
    // Podemos aplicar lógica para editar el nombre de archivo que guardamos
    cb(null, file.originalname) 
  }
})
const upload = multer({ storage: storage});
// multer ^
require('dotenv').config()
const { sequelize, sincronizarTablas, Post, Section } = require('./tables')

// Aplicación de express
const express = require('express');
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.static('media'));

const cors = require('cors'); 
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
      // Opciones para el response:
      res.json(post ? post : {})
      // post ? res.json(post) : res.end("El id no es válido")
    }
  )
})
// POST para crear nuevo post
app.post('/posts', (req, res) => {
  let nuevoPost = req.body 
  console.log("body:", req.body) // FIX: sale vacío
  // IDEA: colocar validaciones del objeto...
  Post.create(nuevoPost).then(post => {
    res.status(201).json(post)
  })
});
// Endpoint UPDATE para editar post
app.patch('/posts/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body; // Los valores a actualizar
  Post.update(datos, {
    where: {
      id: id
    }
  }).then(data => {
    console.log(data);
    // IDEA: formatear el objeto para que sea texto... ?
    res.json({"mensaje": `El post con id ${id} se ha actualizado con: ` + JSON.stringify(datos)})
  })
})
// Endpoint DELETE para borrar post
app.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  Post.destroy({
    where: {
      id: id
    }
  }).then(data => {
    console.log(data);
    res.json({"mensaje": `El post con id ${id} ha sido borrado`})
  })
})
// Section
// GET de lista de sections
app.get('/sections', (req, res) => {
  Section.findAll().then(sections => {
    sections.map(section => console.log(section.dataValues))
    res.json(sections)
  })
})
// GET de un post por id
app.get('/sections/:id', (req, res) => {
  const id = req.params.id;
  Section.findOne({
    where: {
      id: id
    }
  }).then(section => {
    console.log(section);
    section ? res.json(section) : res.json({"mensaje": "Ese id no es válido"})
  })
})
// POST para crear nueva section
app.post('/sections', (req, res) => {
  const newSection = req.body;
  Section.create(newSection).then(data => {
    console.log(data);
    res.status(201).json({"mensaje": `Se ha creado la sección.`})
  })
})
// Endpoint UPDATE para editar section
app.patch('/sections/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body; 
  Section.update(datos, {
    where: {
      id: id
    }
  }).then(data => {
    console.log(data);
    res.json({"mensaje": `La sección con id ${id} se ha actualizado con: ` + JSON.stringify(datos)})
  })
})
// Endpoint DELETE para borrar section
app.delete('/sections/:id', (req, res) => {
  const id = req.params.id;
  Section.destroy({
    truncate: true,
    where: {
      id: id
    }
  }).then(data => {
    console.log(data);
    res.json({"mensaje": "Se ha eliminado la sección"})
  })
})

app.post('/upload', upload.single('file'), function(req, res) {
  console.log("file:", req.file)
  const filename = req.file.name; // filename -> name
  const file = req.file;

  console.group("multer")
  console.log("filename:",filename);
  console.log("file:", file);
  console.groupEnd()

  res.status(201).json({
    'mensaje': 'Se ha subido el archivo: ' + file.filename
  });
});
const PORT = 3000
app.listen(PORT, () => {
  console.log("Servidor en ejecución en http://localhost:" + PORT)}
);