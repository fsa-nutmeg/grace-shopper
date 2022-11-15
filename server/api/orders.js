const router = require('express').Router();
const {
  models: { Order, Album, OrderAlbum },
} = require('../db');
module.exports = router;

// GET /api/orders (Get All Orders)
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({});
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

// POST /api/orders (Create New Order)
router.post('/', async (req, res, next) => {
  const orderInfo = req.body;
  try {
    // requires userId in req.body at minimum
    // should include shippingInfo, billingInfo, and completed
    const order = await Order.create(orderInfo);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/ (Edit Single Order)
// This route should not be used to update the items in an order,
// only its other attributes.
// To update the items, use the /api/orderAlbums routes
router.put('/', async (req, res, next) => {
  try {
    // requires id (of order) in req.body
    const updates = req.body;

    const order = await Order.findByPk(updates.id);

    if (order === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }
    // apply updates to order
    Object.entries(updates).forEach(([key, value]) => {
      order[key] = value;
    });

    await order.save();

    res.json(order);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:orderId (Get Single Order)
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (order === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }

    const items = await OrderAlbum.findAll({
      where: {
        orderId: id,
      },
      include: [Album],
    });
    console.log('order from get order api..... ', order);
    res.json({ ...order.dataValues, items });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orders/:orderId (Delete Single Order)
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (order === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }

    const items = await OrderAlbum.findAll({
      where: {
        orderId: id,
      },
    });

    for (const item of items) {
      await item.destroy();
    }

    await order.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
