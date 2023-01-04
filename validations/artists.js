const {body,query,param} = require('express-validator');

exports.createArtistValidation = [
  param("id","Artist ID is required").notEmpty(),
  body("id").isLength({ min: 1 }).withMessage("id is required"),
  body("name").isLength({ min: 1 }).withMessage("name is required"),
  body("images").isArray({ min: 1 }).withMessage("images is required and must be an array"),
];

exports.createArtistsValidation = [
  body("*").isArray({ min: 1 }).withMessage("body must be an array with at least one artist"),
  body("*.id").isLength({ min: 1 }).withMessage("id is required for each artist"),
  body("*.name").isLength({ min: 1 }).withMessage("name is required for each artist"),
  body("*.images").isArray({ min: 1 }).withMessage("images is required for each artist and must be an array"),
];

exports.searchArtistsValidation = [
  query("q").notEmpty().withMessage("Search query is required"),
  query("limit","Limit must be a positive integer between 1 and 10").isInt({ min: 1, max: 10 }),
];

exports.getArtistByIdValidation = [
  param("id","Artist ID is required").notEmpty(),
];


exports.deleteArtistValidation =[
  param("id","Artist ID is required").notEmpty(),
];