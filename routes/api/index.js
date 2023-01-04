const {Router} = require('express');
const albumRouter = require('./albums');
const artistRouter = require('./artists');
const searchRouter  = require('./search');
const topArtistsRouter = require('./top_artists');

const router = Router();

router.use('/albums', albumRouter);
router.use('/artists', artistRouter);
router.use('/search', searchRouter);
router.use('/topArtists', topArtistsRouter);


router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;