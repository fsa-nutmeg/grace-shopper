const router = require('express').Router()
const { models: { Order }} = require('../db')
module.exports = router

// GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
    })
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

// GET /api/orders/:orderId
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (err) {
    next(err)
  }
})
