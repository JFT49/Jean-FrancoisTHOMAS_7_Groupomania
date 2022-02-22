const db = require("../models")
const Post = db.post
const User = db.user
const Comment = db.comment
const fs = require('fs')   //FS : file system pour la gestion des fichiers image

// Create and Save a new Post
exports.create = (req, res) => {
  const {userId} = res.locals
  User.findOne({where: {id: userId} })
    .then(user => {
      // Create a Post
      let imageURL = null
      if (req.file){
        imageURL = req.protocol + "://" +  req.get('host') + "/images/" + req.file.filename
      } 
      const post = {
        author: user.name,
        text: req.body.message,
        image: imageURL
      }
      // Save Post in the database
      Post.create(post)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while creating the Post." }) }) 
    })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while creating the Post." }) }) 
}

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.findAll({ order: [['createdAt', 'DESC']] })
    .then(data => { res.status(200).send( data ) })
    .catch(err => { res.status(500).json({ err }) })
}

// Find a single Post with an id
exports.findOne = (req, res) => {
    const postid = req.params.postid
    Post.findByPk(postid)
      .then(data => {
        if (data) { res.send(data) }
        else { res.status(404).send({ message: `Cannot find Post with id=${postid}.`}) }
      })
      .catch(err => { res.status(500).send({ message: "Error retrieving Post with id=" + postid + ".Error : " + err }) })  
}

// Delete a single Post with an id and his comments
exports.delete = (req, res) => {
  const postid = req.params.postid
  
  Post.findByPk(postid)
  .then(post => {
    if (post.image != null) { 
      const filename = post.image.split('/images/')[1]    //recupere le nom du fichier image a supprimer
      console.log(filename)
      fs.unlinkSync(`images/${filename}`)    //supprime le fichier image
    }
  })
  .catch(err => { res.status(500).send({ message: err.message }) })  
  
  Post.destroy({where: {id: postid} })   //supprime le post de la BDD
    .then(num => {
      if (num == 1) { 
        Comment.destroy({ where: {post_id: postid} })
          .then(nums => { res.status(200).send({ message: `Post was deleted successfully! And ${nums} comments were deleted successfully!` }) })
          .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while removing comments." }) })
      }
      else { res.send({ message: `Cannot delete Post with id=${postid}. Maybe Post was not found!` }) }
    })
    .catch(error => res.status(500).json({ message: error.message || "Could not delete Post with id=" + postid }))
}