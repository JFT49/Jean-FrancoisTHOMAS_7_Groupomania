const db = require("../models")
const Comment = db.comment
const User = db.user

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
  Comment.findAll({ where: {post_id: req.params.postid}, order: [['createdAt', 'DESC']] })
    .then(data => { res.status(200).send(data) })
    .catch(err => { res.status(500).json({ err })
  })
}

// Create and Save a new Comment
exports.create = (req, res) => {
  const {userId} = res.locals
  User.findOne({where: {id: userId} })
    .then(user => {
      // Create a Comment
      const comment = {
        author: user.name,
        text: req.body.formData.message,
        post_id: req.params.postid
      }
      // Save Comment in the database
      Comment.create(comment)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({ message: err.message || "Some error occurred while creating the Comment." })
        }) 
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while creating the Comment." })
    }) 
}

// Delete a single comment with an id
exports.delete = (req, res) => {
  const comid = req.params.commentid
  Comment.destroy({where: {id: comid} })
    .then(num => {
      if (num == 1) { res.status(200).send({ message: `Comment with id: ${comid} was deleted successfully!` }) }
      else { res.send({ message: `Cannot delete comment with id=${comid}. Maybe comment was not found!` }) }
    })
    .catch(error => { res.status(500).json({ message: error.message || "Could not delete Post with id=" + postid }) })
}