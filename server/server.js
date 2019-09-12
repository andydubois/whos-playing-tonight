
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const homeRouter = require('./routes/home.router');
const eventDetailsRouter = require('./routes/eventDetails.router');
const viewAddRouter = require('./routes/viewAdd.router');
const bandDetailRouter = require('./routes/band.router');
const addShowRouter = require('./routes/addShow.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/home', homeRouter);
app.use('/api/eventDetails', eventDetailsRouter);
app.use('/api/viewAdd', viewAddRouter)
app.use('/api/band', bandDetailRouter)
app.use('/api/addShow', addShowRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
