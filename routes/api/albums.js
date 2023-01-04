const { Router } = require("express");
const { createAlbum, getAlbums, createAlbums, getAlbumById, updateAlbum, deleteAlbum} = require("../../controllers/album_controller");
const { createAlbumValidation, createAlbumsValidation, getAlbumByIdValidation, updateAlbumValidation, deleteAlbumValidation } = require("../../validations/albums");

const router = Router();

router.post("/", createAlbumValidation, createAlbum);
router.get("/", getAlbums);
router.post("/", createAlbumsValidation, createAlbums);
router.get("/:id", getAlbumByIdValidation, getAlbumById);
router.patch("/:id",updateAlbumValidation, updateAlbum);
router.delete("/:id", deleteAlbumValidation, deleteAlbum);

module.exports = router;
