const router = require('express').Router()
const { models: { Album }} = require('../db')
module.exports = router

// GET /api/albums
router.get('/', async (req, res, next) => {
  try {
    const albums = await Album.findAll({
    })
    res.send(albums)
  } catch (err) {
    next(err)
  }
})

// GET /api/albums/:albumId
router.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id);
    res.send(album);
  } catch (err) {
    next(err)
  }
})
