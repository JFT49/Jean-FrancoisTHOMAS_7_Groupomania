const db = require("../models");
const User = db.user;

const bcrypt = require('bcrypt');        //BCRYPT : package de chiffrement (hash)
const jwt = require('jsonwebtoken');     //JSONWEBTOKEN : gestion token d'identification
require('dotenv').config();         //DOTENV : pour le gestion des variables d'environneemnts

const passwordValidator = require('password-validator');  // Plugin password-validator
var Validation = new passwordValidator();
Validation
.is().min(4)                                    // Minimum length 4
.is().max(30)                                  // Maximum length 30
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have digits
.has().not().spaces();                           // Should not have spaces

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.formData.password, 10)      //Hashage du password avec BCRYPT
        .then(hash => {
            const user = new User({
                name: req.body.formData.name,
                email: req.body.formData.email,
                password: hash
            });
            if (Validation.validate(req.body.formData.password)) {    //retourne TRUE si respecte les critéres de Validation
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }));
            }else{
                var Reponse = Validation.validate(req.body.formData.password, { details: true } );  //retourne les details des critéres de Validation non respecté
                var iteration = Reponse.length;
                var Message = "";
                for ( let i = 0; i < iteration ; i++){
                    Message = Message + "\n" + Reponse[i].message;
                };
                res.status(400).json({ message: "Mot de passe non valide !" + Message, Reponse});
            };
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log(req.headers)
    User.findOne({ where: { email: req.body.formData.email, name: req.body.formData.name} })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.formData.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN_VERIFY,      //Variable d'environnement définit dans le .env de DOTENV (.env à mettre dans gitignore)
                        { expiresIn: '24h' }
                    ),
                    message: "Utilisateur logué !"
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
};

// Find a single Tutorial with an id
exports.profile = (req, res) => {
    User.findOne({where: {id: req.body.userId} })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !'})
            }
            return res.status(200).json({user})
        })
        .catch(error => res.status(500).json({ error }))
}

exports.delete = (req, res) => {
    const id = req.body.userId
    User.destroy({where: {id: id} })
        .then(num => {
            if (num == 1) {
                res.send({
                  message: "User was deleted successfully!"
                });
            } else {
                res.send({
                  message: `Cannot delete User with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(error => res.status(500).json({ message: error.message || "Could not delete User with id=" + id }))
}