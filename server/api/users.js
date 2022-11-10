const router = require('express').Router();
const {
  models: { User, Order, OrderAlbum, Album },
} = require('../db');
module.exports = router;

// GET /api/users (Get All Users)
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'address', 'isAdmin'],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// POST /api/users (Create User)
router.post('/', async (req, res, next) => {
  try {
    // requires email & password in req.body
    const user = req.body;
    const newUser = await User.create(user);
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users (Edit User)
router.put('/', async (req, res, next) => {
  try {
    // requires id (of user) in req.body
    const updates = req.body;
    const user = await User.getByPk(updates.id);

    if (user === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }
    // apply updates to user
    Object.entries(updates).forEach(([key, value]) => {
      user[key] = value;
    });

    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/:id (Delete User)
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }

    await user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId (Get One User)
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId/cart (Get Cart)
router.get('/:id/cart', async (req, res, next) => {
  try {
    const [cart] = await Order.findAll({
      where: {
        userId: req.params.id,
        completed: false,
      },
    });

    if (!cart) res.status(404).send({});

    const items = await OrderAlbum.findAll({
      where: {
        orderId: cart.id,
      },
      include: [Album],
    });

    res.json({ ...cart.dataValues, items });
  } catch (err) {
    next(err);
  }
});
