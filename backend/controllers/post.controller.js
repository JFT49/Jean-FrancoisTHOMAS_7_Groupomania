const db = require("../models");
const Post = db.post;
// const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res, next) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Tutorial
  const post = {
    author: req.body.author,
    text: req.body.texte,
    image: req.body.image
  };
  // Save Tutorial in the database
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });  
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res, next) => {
  Post.findAll()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });  
};

