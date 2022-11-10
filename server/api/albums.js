const router = require('express').Router();
const {
  models: { Album },
} = require('../db');
module.exports = router;

// GET /api/albums (Get All Albums)
router.get('/', async (req, res, next) => {
  try {
    const albums = await Album.findAll({});
    res.send(albums);
  } catch (err) {
    next(err);
  }
});

// POST /api/albums (Create Album)
router.post('/', async (req, res, next) => {
  try {
    const album = req.body;
    const newAlbum = await Album.create(album);
    res.json(newAlbum);
  } catch (err) {
    next(err);
  }
});

// PUT /api/albums (Update Album)
router.put('/', async (req, res, next) => {
  try {
    // requires an id in req.body
    const updates = req.body;
    const album = await Album.findByPk(updates.id);

    if (album === null) {
      const err = new Error();
      err.status = 404;
      throw err;
    }

    Object.entries(updates).forEach(([key, value]) => {
      album[key] = value;
    });

    await album.save();

    res.json(album);
  } catch (err) {
    next(err);
  }
});

// GET /api/albums/:albumId (Get One Album)
router.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id);
    res.send(album);
  } catch (err) {
    next(err);
  }
});
