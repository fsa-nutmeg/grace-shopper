const router = require('express').Router();
const {
  models: { OrderAlbum },
} = require('../db');
const Order = require('../db/models/Order');
module.exports = router;

// PUT /api/orderAlbums (Edit Item From Order)
router.put('/', async (req, res, next) => {
  try {
    // requires orderAlbum id in req.body
    // may also contain price and/or quantity
    const updates = req.body;
    const orderAlbum = await OrderAlbum.findByPk(updates.id);

    if (orderAlbum === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }

    Object.entries(updates).forEach(([key, value]) => {
      orderAlbum[key] = value;
    });

    await orderAlbum.save();

    res.json(orderAlbum);
  } catch (err) {
    next(err);
  }
});

// POST /api/orderAlbums (Add Item To Order)
router.post('/', async (req, res, next) => {
  try {
    // requires orderId, albumId, price & quantity
    // in req.body
    const item = req.body;
    const newItem = await OrderAlbum.create(item);
    res.json(newItem);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orderAlbums/:orderAlbumId (Delete Item From Order)
router.delete('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id;
    const item = await OrderAlbum.findByPk(id);

    if (item === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }

    await item.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
