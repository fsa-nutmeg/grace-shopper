const router = require('express').Router()
const { models: { User, Order, OrderAlbum, Album }} = require('../db')
module.exports = router


//GET api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'address', 'isAdmin']
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})

//GET api/users/:userId
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:userId/cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      where: {
        userId: req.params.id,
        completed: false,
      }
  });
    if(!cart.length){
      res.send(cart)
    };
    console.log('cartttttttt',cart);
    const cartId = cart[0].id;
    const orderAlbums = await OrderAlbum.findAll({
      where: {
        orderId: cartId,
      },
      include: [Album]
    });
    res.send(orderAlbums);
  } catch (err) {
    next(err)
  }
})
