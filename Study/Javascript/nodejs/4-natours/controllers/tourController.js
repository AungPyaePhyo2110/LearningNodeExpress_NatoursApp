const fs = require('fs');

const tours = JSON.parse(
	fs.readFileSync(
		`${__dirname}/../dev-data/data/tours-simple.json`
	)
);

exports.checkId = (req, res, next) => {
	const id = Number(req.params.id);
	const tour = tours.find(el => el.id === id);

	if (!tour) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID'
		});
	}
	next();
};

exports.checkBody = (req, res, next) => {
	if (!req.body.name || !req.body.price) {
		return res.status(400).json({
			status: 'fail',
			message: 'Missing name or price'
		});
	}

	next();
};

exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		requestedAt: req.requestTime,
		data: {
			tours
		}
	});
};

exports.getTour = (req, res) => {
	const id = Number(req.params.id);
	const tour = tours.find(el => el.id === id);

	res.status(200).json({
		status: 'success',
		data: {
			tour
		}
	});
};

exports.createTour = (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = { ...req.body, id: newId };

	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		err => {
			res.status(201).json({
				status: 'success',
				data: {
					tour: newTour
				}
			});
		}
	);
};

exports.updateTour = (req, res) => {
	const id = Number(req.params.id);
	const tour = tours.find(el => el.id === id);

	res.status(200).json({
		status: 'success',
		data: {
			tour
		}
	});
};

exports.deleteTour = (req, res) => {
	res.status(204).json({
		status: 'success',
		data: null
	});
};
