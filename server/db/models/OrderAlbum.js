const Sequelize = require('sequelize')
const db = require('../db')

const OrderAlbum = db.define('orderAlbum', {
  price: {
    type: Sequelize.FLOAT,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
})

module.exports = OrderAlbum;
