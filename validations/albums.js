const {body,query,param} = require('express-validator');

exports.createAlbumValidation = [
  body("id").isLength({ min: 1 }).withMessage("id is required"),
  body("name").isLength({ min: 1 }).withMessage("name is required"),
  body("images").isArray({ min: 1 }).withMessage("images is required and must be an array"),
  body("artists").isArray({min: 1}).withMessage("artist is required"),
];

exports.createAlbumsValidation = [
  body("*").isArray({ min: 1 }).withMessage("body must be an array with at least one artist"),
  body("*.id").isLength({ min: 1 }).withMessage("id is required for each artist"),
  body("*.name").isLength({ min: 1 }).withMessage("name is required for each artist"),
  body("*.images").isArray({ min: 1 }).withMessage("images is required for each artist and must be an array"),
  body("*.artists").isArray({min: 1}).withMessage("artists is required for earch artist and must be an array"),
];

exports.searchAlbumsValidation = [
  query("q").notEmpty().withMessage("Search query is required"),
  query("limit","Limit must be a positive integer between 1 and 10").isInt({ min: 1, max: 10 }),
];

exports.getAlbumByIdValidation = [
  param("id","Album ID is required").notEmpty(),
];


exports.deleteAlbumValidation =[
  param("id","Album ID is required").notEmpty(),
];

exports.updateAlbumValidation = [
  ...this.getAlbumByIdValidation,
  ...this.createAlbumValidation,
];