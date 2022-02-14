module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    author: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING
    },
    post_id: {
      type: Sequelize.INTEGER
    }
  })

  return Comment
}