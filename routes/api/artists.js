const express = require("express");

const {
  createArtist,
  createArtists,
  getArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  searchArtists,
} = require("../../controllers/artist_controller");

const {
  createArtistValidation,
  createArtistsValidation,
  searchArtistsValidation,
  getArtistByIdValidation,
} = require("../../validations/artists");

const router = express.Router();

router.post("/", createArtistValidation, createArtist);
router.post("/bulk", createArtistsValidation, createArtists);
router.get("/search", searchArtistsValidation, searchArtists);
router.get("/:id", getArtistByIdValidation, getArtistById);
router.put("/:id", createArtistValidation, updateArtist);
router.delete("/:id", getArtistByIdValidation,deleteArtist);
router.get("/", getArtists);

module.exports = router;
