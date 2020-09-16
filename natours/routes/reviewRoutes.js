const express = require('express');
const reviewController = require('./../controllers/reviewController');
const auhtController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(auhtController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    auhtController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(
    auhtController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  )
  .patch(
    auhtController.restrictTo('user', 'admin'),
    reviewController.updateReview
  );

module.exports = router;
