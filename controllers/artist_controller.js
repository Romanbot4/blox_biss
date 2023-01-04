const { Op } = require("sequelize");
const { check, validationResult } = require("express-validator");
const db = require("./../database");
const artist = require("../models/artist");
const Artist =  db.artist;

const createArtist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors });
  }

  try {
    const newArtist = await Artist.create(req.body);
    return res.status(201).json( newArtist );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getArtists = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit): 20;
    const offset = req.query.offset ? parseInt(req.query.offset): 0;
    const artists = await Artist.findAndCountAll({ limit, offset });
    const total = artists.count;
    const next = offset + limit < total ? offset + limit : null;
    res.send({ artists: artists.rows, length: artists.rows.length, next: next, total: total });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getTopArtists = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const artists = await Artist.findAndCountAll({
      order: [['followers', 'DESC']],
      limit: limit,
      offset: offset
    });
    const total = artists.count;
    const next = offset + limit < total ? offset + limit : null;
    res.send({ artists: artists.rows, length: artists.rows.length, next: next, total: total });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

const createArtists = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors });
  }

  try {
    const newArtists = await Artist.bulkCreate(req.body);
    return res.status(201).json({
      artists: newArtists,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getArtistById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors });
  }

  try {
    const { id } = req.params;
    const foundArtist = await Artist.findByPk(id);
    if (!foundArtist) {
      return res.status(404).json({
        error: `Artist with id ${id} not found`,
      });
    }
    return res.status(200).json({
      artist: foundArtist,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateArtist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors });
  }

  try {
    const { id } = req.params;
    const foundArtist = await Artist.findByPk(id);
    if (!foundArtist) {
      return res.status(404).json({
        error: `Artist with id ${id} not found`,
      });
    }
    const updatedArtist = await foundArtist.update(req.body);
    return res.status(200).json({
      artist: updatedArtist,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteArtist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors });
  }

  try {
    const { id } = req.params;
    const foundArtist = await Artist.findByPk(id);
    if (!foundArtist) {
      return res.status(404).json({
        error: `Artist with id ${id} not found`,
      });
    }
    await foundArtist.destroy();
    return res.status(204).json({});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const searchArtists = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors });
  }

  try {
    const { q, limit } = req.query;
    const artists = await Artist.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${q}%`
            },
          },
          {
            mmName: {
              [Op.iLike]: `%${q}%`
            },
          }
        ]
      },
      order: [['followers', 'DESC']],
      limit: limit ? Math.min(parseInt(limit), 5) : 5,
    });
    const total = artists.count;
    res.send({ artists: artists.rows, total: total });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createArtist,
  getArtists,
  createArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  searchArtists,
  getTopArtists,
};
