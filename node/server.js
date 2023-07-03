const express = require('express');
const fs = require('fs');
const https = require('https');
const rateLimit = require('express-rate-limit')

const app = express();

// Configura el límite de solicitudes: 100 solicitudes por hora
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 100, // límite de 100 solicitudes
});

// Aplica el límite de solicitudes a todas las rutas
app.use(limiter);

// Lee el certificado y la clave privada
const privateKey = fs.readFileSync('.keys/server.key', 'utf8');
const certificate = fs.readFileSync('.keys/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Configura la aplicación para utilizar HTTPS
const httpsServer = https.createServer(credentials, app);

// Define tus rutas y middleware aquí
app.get('/', (req, res) => {
  let unixTime = new Date().getTime()
  console.log("GET request at " + unixTime)
  res.send('Hello, HTTPS!');
});

// Inicia el servidor HTTPS
httpsServer.listen(3000, '0.0.0.0', () => {
  console.log('HTTPS server is running on port 3000');
});
