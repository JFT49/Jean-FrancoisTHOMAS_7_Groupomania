const db = require("../models")
const User = db.user
const Post = db.post
const Comment = db.comment
const bcrypt = require('bcrypt')        //BCRYPT : package de chiffrement (hash)
const jwt = require('jsonwebtoken')     //JSONWEBTOKEN : gestion token d'identification
require('dotenv').config()              //DOTENV : pour le gestion des variables d'environneemnts

const passwordValidator = require('password-validator')  // Plugin password-validator
const PostModel = require("../models/Post.model")
var Validation = new passwordValidator()
Validation
.is().min(4)                                    // Minimum length 4
.is().max(30)                                   // Maximum length 30
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces

exports.signup = (req, res) => {
    bcrypt.hash(req.body.formData.password, 10)      //Hashage du password avec BCRYPT
        .then(hash => {
            const user = new User({
                name: req.body.formData.name,
                email: req.body.formData.email,
                password: hash,
                admin: false
            })
            if (Validation.validate(req.body.formData.password)) {    //retourne TRUE si respecte les critéres de Validation
            user.save()
                .then( () => res.status(201).json({ message: 'Utilisateur créé !'}) )
                .catch(error => res.status(400).json({ error }) )
            }else{
                var Reponse = Validation.validate(req.body.formData.password, { details: true } )  //retourne les details des critéres de Validation non respecté
                var iteration = Reponse.length
                var Message = ""
                for ( let i = 0; i < iteration ; i++){
                    Message = Message + "\n" + Reponse[i].message
                }
                res.status(400).json({ message: "Mot de passe non valide !" + Message, Reponse })
            }
        })
        .catch(error => res.status(500).json({ error }) )
}

exports.login = (req, res) => {
    User.findOne({ where: { name: req.body.formData.name } })
        .then(user => {
            if (!user) { return res.status(401).json({ message: 'Utilisateur non trouvé !'}) }
            bcrypt.compare(req.body.formData.password, user.password)
            .then(valid => {
                if (!valid) { return res.status(401).json({ message: 'Mot de passe incorrect !'}) }
                res.status(200).json({
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN_VERIFY,      //Variable d'environnement définit dans le .env de DOTENV (.env à mettre dans gitignore)
                        { expiresIn: '24h' }
                    )
                })
            })
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.profile = (req, res) => {           // res.locals est transmis ppar la req
    const {userId} = res.locals    
    User.findOne({where: {id: userId} })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !'})
            }
            return res.status(200).json({user})
        })
        .catch(error => res.status(500).json({ error }) )
}

exports.delete = (req, res) => {             // res.locals est transmis par la req
    const {userId} = res.locals 
    var reponse =""
    User.findOne({where: {id: userId} })
        .then(user => {
            Comment.destroy({where: {author: user.dataValues.name} })
                .then(num => { reponse += "Comments user deleted : " + num + "\n" })
                .catch(error => res.status(500).json({ message: error.message || "Could not delete Comments" }) )

            Post.destroy({where: {author: user.dataValues.name} })
                .then(num => { reponse += "Posts deleted : " + num + "\n" })
                .catch(error => res.status(500).json({ message: error.message || "Could not delete Posts" }) )

            User.destroy({where: {id: userId} })
                .then(num => {
                    if (num == 1) {
                        reponse += "User was deleted successfully !"
                        res.status(200).json({ message: reponse })
                    } else {
                        res.statut(401).json({ message: `Cannot delete User with id=${userId}. Maybe User was not found!` })
                    }
                })
                .catch(error => res.status(500).json({ message: error.message || "Could not delete User with id=" + userId }))
        })
        .catch(error => res.status(500).json({ message: error.message || "Could not find User with id=" + userId }))
}