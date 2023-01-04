const {Router} = require ("express");
const {searchArtistsValidation} = require("../../validations/artists");
const {searchArtists} = require("../../controllers/artist_controller");
const {searchAlbums} = require("../../controllers/album_controller");
const { searchAlbumsValidation } = require("../../validations/albums");

const router = Router();

router.get('/artists',searchArtistsValidation,searchArtists);
router.get('/albums',searchAlbumsValidation, searchAlbums);

module.exports = router;