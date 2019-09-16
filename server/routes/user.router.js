const express = require("express");
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText =
    'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id';
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get("/history/:id", rejectUnauthenticated, (req, res) => {
  console.log('req.body is:', req.params.id);
  const queryText = `
  SELECT bands.band_name, events.date, events.id FROM events
  JOIN band_event ON events.id=band_event.event_id
  JOIN bands ON band_event.band_id=bands.id
  JOIN user_event ON events.id=user_event.event_id
  WHERE user_event.user_id=$1 AND events.date < CURRENT_DATE;`;
  pool.query(queryText, [req.params.id]).then(results => {
    res.send(results.rows);
  }).catch(error => {
    console.log("error in server side user history GET", error)
  })
});

router.get("/created/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT "bands".band_name, "events".creator_id, "events".date, "events".id FROM events
  JOIN band_event ON events.id=band_event.event_id
  JOIN bands ON band_event.band_id=bands.id
  WHERE events.creator_id=$1;`;
  pool.query(queryText, [req.params.id]).then(results => {
    res.send(results.rows);
  }).catch(error => {
    console.log("error in server side user created shows GET", error)
  })
})

module.exports = router;
