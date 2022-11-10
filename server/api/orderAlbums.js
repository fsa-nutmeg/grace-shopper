const router = require('express').Router();
const {
  models: { OrderAlbum },
} = require('../db');
module.exports = router;

// POST /api/orderAlbums (Add Item To Order)
router.post('/', async (req, res, next) => {
  try {
    // requires orderId, albumId, price & quantity
    // in req.body
    const item = req.body;
    const newItem = await new OrderAlbum(item);
    res.json(newItem);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orderAlbums/:orderAlbumId (Delete Item From Order)
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
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
