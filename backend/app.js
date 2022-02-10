//Application Express

const express = require('express');     //EXPRESS : framework 
const cors = require('cors');         //CORS : Cross Origin Resource Sharing
const helmet = require("helmet");    //HELMET : xssFilter, noSniff, ...
require('dotenv').config();         //DOTENV : pour le gestion des variables d'environneemnts

const app = express();

app.use(helmet());   //HELMET

app.use(cors());    //CORS définit comment les serveurs et les navigateurs interagissent, en spécifiant quelles ressources peuvent être demandées de manière légitime
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');   //accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');//envoyer des requêtes avec les méthodes mentionnées 
    next();
  });

app.use(express.json());   //Express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req

//gestion par Express de la ressource images de manière statique (pointe vers le sous repertoire /images)
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

const db = require("./models");
db.sequelize.sync();

//Routeurs
const postRoutes = require('./routes/post.routes.js');
app.use('/api/post', postRoutes);
const commentRoutes = require('./routes/comment.routes.js');
app.use('/api/comment', commentRoutes);
const userRoutes = require('./routes/user.routes.js');
app.use('/api/user', userRoutes);

module.exports = app;