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
  console.log("req.body is:", req.params.id);
  const queryText = `
  SELECT bands.band_name, "bands".id as band_id, events.date, events.id FROM events
  JOIN band_event ON events.id=band_event.event_id
  JOIN bands ON band_event.band_id=bands.id
  JOIN user_event ON events.id=user_event.event_id
  WHERE user_event.user_id=$1 AND events.date < CURRENT_DATE ORDER BY events.date DESC;`;
  pool
    .query(queryText, [req.params.id])
    .then(results => {
      res.send(results.rows);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log("error in server side user history GET", error);
    });
});

router.get("/created/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT "bands".band_name, "bands".id as band_id, "events".creator_id, "events".date, "events".id FROM events
  JOIN band_event ON events.id=band_event.event_id
  JOIN bands ON band_event.band_id=bands.id
  WHERE events.creator_id=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side user created shows GET", error);
    });
});

router.delete("/deleteShow/:id", rejectUnauthenticated, async (req, res) => {
  const id = req.params.id;

  const connection = await pool.connect();
  try {
    //starts multi-state SQL "transaction"
    await connection.query("BEGIN");
    //deletes all band_event entries related to band
    const band_eventQuery = `
    DELETE FROM band_event WHERE event_id=$1`;
    //deletes all entries in events table
    const eventsQuery = `
    DELETE FROM events WHERE id=$1`;
    //delete all entries in user_event table
    const user_eventQuery = `
    DELETE FROM user_event WHERE event_id=$1`;

    await connection.query(band_eventQuery, [id]);
    await connection.query(user_eventQuery, [id]);
    await connection.query(eventsQuery, [id]);
    //successful end to "transaction"
    await connection.query("COMMIT");
    console.log("Successful DELETE of show at index", id);
    res.sendStatus(201);
  } catch (error) {
    //reverts all statements in transaction
    await connection.query("ROLLBACK");
    console.log("error in server side show DELETE", error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});


module.exports = router;
