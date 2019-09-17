const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/venues", rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT * FROM "locations";`;
  pool
    .query(queryText)
    .then(results => {
      console.log(results.rows);
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side venues GET", error);
      res.sendStatus(500);
    });
});

//POST route for new event.  Adds data to event table and band_event table
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const queryText = `
  WITH rows AS(INSERT INTO "events" (locations_id, date, creator_id, time_doors, time_show)
  VALUES ($1, $2, $3, $4, $5) RETURNING id)
  INSERT INTO "band_event" (band_id, event_id) VALUES ($6, (SELECT id FROM rows));`;
  pool
    .query(queryText, [
      req.body.venueId,
      req.body.showDate,
      req.user.id,
      req.body.doorTime,
      req.body.showTime,
      req.body.bandId
    ])
    .then(result => {
      res.sendStatus(200);
      console.log("successful newEvent POST server side");
    })
    .catch(error => {
      console.log("error in addEvent POST server side", error);
      res.sendStatus(500);
    });
});

//POST route for adding new venue to database
router.post("/addVenue", rejectUnauthenticated, (req, res) => {
  const queryText = `
  INSERT INTO "locations" (location_name, number_street, city, state, zip_code) VALUES ($1, $2, $3, $4, $5);`;
  pool.query(queryText, [req.body.venue_name, req.body.numberStreet, req.body.city, req.body.state, req.body.zip])
  .then(result => {
    res.sendStatus(200);
    console.log("successful newVenue POST server side");
  })
  .catch(error => {
    console.log("error in addVenue POST server side", error);
  })
});

module.exports = router;
