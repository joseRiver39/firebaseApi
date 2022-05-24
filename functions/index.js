const functions = require("firebase-functions");

const express = require("express")
const app = express()

const admin = require("firebase-admin")



admin.initializeApp({
    credential: admin.credential.cert('./permisos.json')
})

app.get('/hello-wold', (req, res) =>{
  return res.status(200).json({message: 'Hola Mundo'})
})

app.use(require('./routes/direcciones.routes'))


exports.app = functions.https.onRequest(app);


