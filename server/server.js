const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const characterRouter = require('./routes/character.router');
const gearRouter = require('./routes/gear.router');
const advancementRouter = require('./routes/advancement.router');
const equipageRouter = require('./routes/equipage.router');
const gamemasterRouter = require('./routes/gamemaster.router');
const inPlayCharacterRouter = require('./routes/inPlayCharacter.router');
const shoppingRouter = require('./routes/shopping.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user/', userRouter);
app.use('/api/characters/', characterRouter);
app.use('/api/gear/', gearRouter);
app.use('/api/advancement/', advancementRouter);
app.use('/api/equipage/', equipageRouter);
app.use('/api/gamemaster/', gamemasterRouter);
app.use('/api/inPlay/', inPlayCharacterRouter);
app.use('/api/shopping', shoppingRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
