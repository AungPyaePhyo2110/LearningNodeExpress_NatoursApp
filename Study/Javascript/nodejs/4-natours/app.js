const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();

// 1 ) middlewares
app.use(morgan('dev'));

app.use(express.json()); // middleware so that incoming string is like json

app.use((req, res, next) => {
	// console.log('hello from the middleware');
	next();
}); // custom middleware

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

//routes
// this is also like applying middleware to  specific routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// app.use('/overview.html', (req, res) => {
// 	res.send('Hello world!');
// });

app.use(express.static(`${__dirname}/public`)); // if there is no route , return the static files

module.exports = app;
