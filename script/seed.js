'use strict';

const {
  db,
  models: { Album, Genre, Order, OrderAlbum, User },
} = require('../server/db');

const axios = require('axios');
const { faker } = require('@faker-js/faker');

const USER_ID = 'acb7e91a80d7d2f58de1b5f8f149cdac';
const CONFIG = {
  headers: {
    ['User-Agent']: 'grace-shopper/1.0',
    ['Content-Type']: 'application/x-www-form-urlencoded',
  },
};
const NUM_ARTISTS = 20;
const ALBUMS_PER_ARTIST = 5;
const NUM_USERS = 30;

const prices = [9.99, 19.99, 15.99, 12.84];
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // get top 20 artists
  const topArtistsURL = `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${USER_ID}&format=json`;
  const artistData = await axios.get(topArtistsURL, CONFIG);

  // map the top 20 artist to an array of just their names
  const top20Artists = artistData.data.artists.artist
    .slice(0, NUM_ARTISTS)
    .map(artist => artist.name);

  for (const artist of top20Artists) {
    // get top albums for top artists
    const artistAlbumsURL = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${USER_ID}&format=json`;
    const artistAlbumsData = await axios.get(artistAlbumsURL, CONFIG);

    // map the top 5 albums to an array of just the album titles
    const top5Albums = artistAlbumsData.data.topalbums.album
      .splice(0, ALBUMS_PER_ARTIST)
      .map(album => album.name);

    for (const albumTitle of top5Albums) {
      // get specific album info for each album
      const albumURL = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${USER_ID}&artist=${artist}&album=${albumTitle}&format=json`;
      const { data } = await axios.get(albumURL, CONFIG);
      const { album } = data;

      const tracksData =
        album.tracks && album.tracks.track.length ? album.tracks.track : 0;

      const tags = album.tags && album.tags.tag.length > 2 ? album.tags.tag : 0;

      if (album && tracksData && tags && album.wiki) {
        // normalize data for album
        const artistName = album.artist;
        const title = album.name;
        const tracks = tracksData.map(track => track.name);

        const description = album.wiki.summary;
        const image = album.image[3]['#text'];
        const genre = tags[1].name;

        // create extra data as needed
        const price = prices[Math.floor(Math.random() * 4)];
        const quantity = Math.floor(Math.random() * 50);
        const staffPick = false;
        // create album!
        await Album.create({
          artistName,
          title,
          tracks,
          description,
          image,
          genre,
          price,
          quantity,
          staffPick,
        });
      }
    }
  }
  // Creating Users
  for (let i = 0; i < NUM_USERS; i += 1) {
    const user = {};
    user.email = faker.internet.email();
    user.password = faker.lorem.word(12);
    user.address =
      faker.address.streetAddress() +
      ' ' +
      faker.address.city() +
      ' ' +
      faker.address.country();
    user.isAdmin = false;
    await User.create(user);
  }
  console.log(`seeded grace-shopper successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
