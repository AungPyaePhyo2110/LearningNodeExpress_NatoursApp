const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router(); // middleware

//val holds the vlaue of the parameter id
router.param('id', tourController.checkId);

router
	.route('/')
	.get(tourController.getAllTours)
	.post(
		tourController.checkBody,
		tourController.createTour
	);

router
	.route('/:id')
	.patch(tourController.updateTour)
	.delete(tourController.deleteTour)
	.get(tourController.getTour);

module.exports = router;
