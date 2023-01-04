const {Router} = require("express");
const { getTopArtists } = require("../../controllers/artist_controller");

const router = Router();


router.get('/', getTopArtists);

module.exports = router;