// const { Op } = require("sequelize/dist");
const db = require("../models");
const Comment = db.comment;
//const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res, next) => {

  Comment.findAll({ where: {post_id: req.params.postid}})
    .then(data => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
};