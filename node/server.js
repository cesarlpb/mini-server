const express = require('express');
const fs = require('fs');
const https = require('https');
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const cors = require('cors');

const app = express();
app.use(cors());

const bodyParser = require('body-parser');
// Parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Configura el límite de solicitudes: 100 solicitudes por hora
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 100, // límite de 100 solicitudes
});

// Aplica el límite de solicitudes a todas las rutas
app.use(limiter);

const Sequelize = require('sequelize');
// const sequelize = new Sequelize(process.env.DB_URL);
const sequelize = new Sequelize(process.env.DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const { DataTypes } = require('sequelize');

// Definir el modelo "Tweet"
const Tweet = sequelize.define('Tweet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_on: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'Tweets', // Nombre de la tabla en la base de datos
  timestamps: true // Utilizar timestamps de Sequelize (created_at, updated_at)
});

// Crear la tabla "tweets" si no existe
Tweet.sync();


// Lee el certificado y la clave privada
const privateKey = fs.readFileSync('.keys/server.key', 'utf8');
const certificate = fs.readFileSync('.keys/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Configura la aplicación para utilizar HTTPS
const httpsServer = https.createServer(credentials, app);


// const http = require('http');
// const httpServer = https.createServer(app);

// Define tus rutas y middleware aquí
app.get('/', (req, res) => {
  let unixTime = new Date().getTime()
  console.log("GET request at " + unixTime)
  res.send('Welcome to my api!');
});

const tweets = [
  {
    "id": 1,
    "content": "Esto es un tweet de prueba 1 desde Node",
    "author": "César",
    "created_on": "04-07-2023"
  },
  {
    "id": 2,
    "content": "Esto es un tweet de prueba 2 desde Node",
    "author": "César", 
    "created_on": "04-07-2023"
  },
  {
    "id": 3,
    "content": "Esto es un tweet de prueba 3 desde Node",
    "author": "César",
    "created_on": "04-07-2023"
  }
]

async function seedTweets(tweets){
  console.log("type", typeof(tweets))
  // Iterar sobre cada tweet del array
  for (const tweet of tweets) {
    try {
      // Verificar si el tweet ya existe en la base de datos por su ID
      const [existingTweet, created] = await Tweet.findOrCreate({
        where: { id: tweet.id },
        defaults: {
          content: tweet.content,
          author: tweet.author,
          created_on: tweet.created_on
        }
      });

      if (created) {
        console.log('Nuevo tweet creado:', existingTweet.toJSON());
      } else {
        console.log('El tweet ya existe:', existingTweet.toJSON());
      }
    } catch (error) {
      console.error('Error al volcar el tweet en la base de datos:', error);
    }
  }
}

seedTweets(tweets).then( (res) => console.log(res) );

app.get('/api/cdm/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.findAll();
    let unixTime = new Date().getTime();
    console.log("GET request to /api/tweets at " + unixTime);
    res.send(tweets);
  } catch (error) {
    console.error('Error al recuperar los tweets:', error);
    res.status(500).send('Error al recuperar los tweets');
  }
});
app.get('/api/cdm/tweets/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el tweet en la base de datos por su ID
    const tweet = await Tweet.findByPk(id);

    if (!tweet) {
      return res.status(404).send('Tweet no encontrado');
    }

    let unixTime = new Date().getTime();
    console.log(`GET request to /api/tweets/${id} at ${unixTime}`);

    // Devolver el objeto de tweet encontrado
    res.send(tweet);
  } catch (error) {
    console.error('Error al recuperar el tweet:', error);
    res.status(500).send('Error al recuperar el tweet');
  }
});
app.post('/api/cdm/tweets', async (req, res) => {
  try {
    const { content, author } = req.body;

    // Crear un nuevo tweet en la base de datos
    const tweet = await Tweet.create({ content, author });

    let unixTime = new Date().getTime();
    console.log(`POST request to /api/cdm/tweets at ${unixTime}`);

    // Enviar la respuesta con el tweet creado
    res.status(201).json(tweet);
  } catch (error) {
    console.error('Error al crear el tweet:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el tweet.' });
  }
});
app.delete('/api/cdm/tweets/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el tweet en la base de datos por su ID
    const tweet = await Tweet.findByPk(id);

    if (!tweet) {
      return res.status(404).send('Tweet no encontrado');
    }

    // Eliminar el tweet de la base de datos
    await tweet.destroy();

    let unixTime = new Date().getTime();
    console.log(`DELETE request to /api/tweets/${id} at ${unixTime}`);

    // Responder con un mensaje de éxito
    res.send('Tweet eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el tweet:', error);
    res.status(500).send('Error al eliminar el tweet');
  }
});
app.put('/api/cdm/tweets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;

    // Buscar el tweet en la base de datos por su ID
    const tweet = await Tweet.findByPk(id);

    if (!tweet) {
      return res.status(404).send('Tweet no encontrado');
    }

    // Actualizar los campos del tweet
    tweet.content = content;
    tweet.author = author;
    await tweet.save();

    let unixTime = new Date().getTime();
    console.log(`PUT request to /api/tweets/${id} at ${unixTime}`);

    // Responder con el tweet actualizado
    res.send(tweet);
  } catch (error) {
    console.error('Error al actualizar el tweet:', error);
    res.status(500).send('Error al actualizar el tweet');
  }
});

// Inicia el servidor HTTPS
httpsServer.listen(3000, '0.0.0.0', () => {
  console.log('HTTPS server is running on port 3000');
});
