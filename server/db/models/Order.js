const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingInfo: {
    type: Sequelize.TEXT,
  },
  billingInfo: {
    type: Sequelize.TEXT,
  },
  completed: {
    type: Sequelize.BOOLEAN,
  },
//TODO check if Order table creates created_at column
})

module.exports = Order;
