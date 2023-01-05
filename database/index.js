const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

Artist = require("../models/artist")(sequelize, Sequelize);
Album = require("../models/album")(sequelize, Sequelize);
AlbumArtist = require("../models/album_artist")(sequelize, Sequelize);

//relatonships
Album.belongsToMany(Artist, { through: 'albumartists' });
Artist.belongsToMany(Album, { through: 'albumartists' });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Op = Sequelize.Op;

db.Artist = Artist;
db.Album = Album;
db.AlbumArtist = AlbumArtist;

module.exports = db;
