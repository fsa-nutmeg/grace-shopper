const router = require('express').Router();
const {
  models: { User, Order, OrderAlbum, Album },
} = require('../db');
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// GET /api/users (Get All Users)
router.get('/', requireToken, async (req, res, next) => {
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
router.post('/', requireToken, async (req, res, next) => {
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
router.put('/', requireToken, async (req, res, next) => {
  try {
    // requires id (of user) in req.body
    const updates = req.body;
    const user = await User.findByPk(updates.id);

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
router.delete('/:id', requireToken, async (req, res, next) => {
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
router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

