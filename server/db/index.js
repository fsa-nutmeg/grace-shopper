//this is the access point for all things database related!

const db = require('./db');
const Order = require('./models/Order');
const OrderAlbum = require('./models/OrderAlbum');
const Album = require('./models/Album')

const User = require('./models/User')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Order,
    OrderAlbum,
    Album
  },
}
User.hasMany(Order);
Order.belongsTo(User);

Album.hasMany(OrderAlbum);
OrderAlbum.belongsTo(Album);

OrderAlbum.belongsTo(Order);
