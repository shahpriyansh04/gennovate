const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const apiRoute = require(`./route/apiRoute`);
const AppError = require('./util/appError');
const globalErrorHandler = require(`./controller/errorController`);
const chatRoute = require(`./route/chatsRoute`);
const userRoute = require(`./route/userRoute`);
const messageRoute = require(`./route/messageRoute`);
const schemaRoute = require(`./route/schemaRoute`);
const app = express();

// 1) GLOBAL MIDDLEWARES
// Serving static files

// Set security HTTP headers

// Development logging
app.use(morgan('dev'));

// Limit requests from same API
app.use(bodyParser.json());

// Body parser, reading data from body into req.body
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Test middleware
// 3) ROUTES
app.get('/', (req, res) => {
  res.send("Hello World, I'm here!");
});
app.use('/message', messageRoute);
app.use('/user', userRoute);
app.use('/chat', chatRoute);
app.use('/schema', schemaRoute);
app.use('/api', apiRoute);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
