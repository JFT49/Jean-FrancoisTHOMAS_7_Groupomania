module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    author: {
      type: Sequelize.STRING
    },
    texte: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    }
  });

  return Post;
};