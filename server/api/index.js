const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/albums', require('./albums'));
router.use('/orders', require('./orders'));
router.use('/orderAlbums', require('./orderAlbums'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
