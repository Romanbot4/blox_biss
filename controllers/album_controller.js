const {Op} = require("sequelize");
const { validationResult } = require("express-validator");
const db = require("./../database");
const Album =  db.album;

const createAlbum = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const newAlbum = await Album.create(req.body);
    return res.status(201).send(newAlbum);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getAlbums = async (req, res) => {
  try {
    const limit = req.query.limit ? Match.min(parseInt(req.query.limit),20) : 20 ;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const albums = await Album.findAndCountAll({ limit, offset });
    const total = albums.count;
    const next = offset + limit < total ? offset + limit : null;
    res.send({ albums: albums.rows, length: albums.rows.length, next: next, total: total });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const createAlbums = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const albums = req.body;
    try {
      // Start a transaction
      const transaction = await sequelize.transaction();

      // Insert the albums into the database
      const results = await Album.bulkCreate(albums, { transaction });

      // Commit the transaction
      await transaction.commit();

      res.send(results);
    } catch (error) {
      // Rollback the transaction if something went wrong
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAlbumById = async (req, res) => {
  const errors =  validationResult(req);
  if(!errors.isEmpty){
    return res.status(422).send({errors: errors.array});
  }

  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).send("Album not found");
    
    res.send(album);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const updateAlbum = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array()});
    }

    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).send("Album not found");

    // Update album
    await album.update(req.body);
    res.send(album);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteAlbum = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmtpy){
    return res.status(422).send({ errors: errors.array()});
  }

  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).send("Album not found");

    await album.destroy();
    res.send("Album deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const searchAlbums = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty) {
    return res.status(422).send({errors: errors.array()});
  }

  try {
    const {q, limit} = req.query;

    const artists = Album.findAndCountAll({
      where: {
        [Op.or] : [
          {
            name: {
              [Op.iLike] : `%${q}%`
            },
          },
          {
            mmName: {
              [Op.iLike]: `%${q}%`
            }
          }
        ]
      },
      order: [['followers', 'DESC']],
      limit: limit? Math.min(limit, 5): 5,
    });

    const total = artists.total;
    res.send({artists: artists.value, total: total});
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = {
  createAlbum,
  getAlbums,
  createAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  searchAlbums,
};
