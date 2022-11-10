const Sequelize = require('sequelize')
const db = require('../db')

const Album = db.define('album', {
  title: {
    type: Sequelize.STRING,
  },
  artistName: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  tracks: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  staffPick: {
    type: Sequelize.BOOLEAN,
  },
  description: {
    type: Sequelize.TEXT,
  },
  image: {
    type: Sequelize.STRING,
  },
  genre: {
    type: Sequelize.STRING
  }

})

module.exports = Album;
