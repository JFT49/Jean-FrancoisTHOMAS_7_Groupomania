const db = require("../models");
const Post = db.post;
const User = db.user;

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
            console.log(post.image)
          // Save Post in the database
          Post.create(post)
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({ message: err.message || "Some error occurred while creating the Post." })
            }) 
        })
        .catch(err => {
          res.status(500).send({ message: err.message || "Some error occurred while creating the Post." })
        }) 
}

// Retrieve all Posts from the database.
exports.findAll = (req, res, next) => {
  Post.findAll({
    order: [['createdAt', 'DESC']]
  })
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const postid = req.params.postid;
    Post.findByPk(postid)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Post with id=${postid}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Post with id=" + postid + ".Error : " + err
        });
      });  
};