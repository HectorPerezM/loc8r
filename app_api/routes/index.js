const express = require('express');
const router  = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews   = require('../controllers/reviews');
const ctrlAuth = require('../controllers/authentication');
//locations
router
    .route('/locations')
    .get(ctrlLocations.locationsListByDistance)
    .post(ctrlLocations.locationsCreate);

router.
    route('/locations/:locationId')
    .get(ctrlLocations.locationsReadOne)
    .put(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

//reviews
router
    .route('/locations/:locationId/reviews')
    .post(ctrlReviews.reviewsCreate);

router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

//Auth
router.post('/register' ,ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;