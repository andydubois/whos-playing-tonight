const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT "bands".band_name, "locations".location_name, "locations".city, "locations".number_street, "locations".state, "locations".zip_code, "events".date, "events".id, "events".time_doors, "events".time_show FROM "events"
  JOIN "band_event" ON "events".id="band_event".event_id
  JOIN "locations" ON "events".locations_id="locations".id
  JOIN "bands" ON "band_event".band_id="bands".id
  WHERE "events".id=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(results => {
      res.send(results.rows[0]);
      console.log(results.rows[0]);
    })
    .catch(error => {
      console.log("error in server side event details GET", error);
      res.sendStatus(500);
    });
});

router.get("/guests/:id", (req, res) => {
  const queryText = `
    SELECT "user".username FROM "user"
    JOIN "user_event" ON "user".id="user_event".user_id
    JOIN "events" ON "user_event".event_id="events".id
    WHERE "events".id=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(results => {
      res.send(results.rows);
      console.log(results.rows);
    })
    .catch(error => {
      console.log("error in server side event guest GET", error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/rsvp/:id", (req, res) => {
  const user_id = req.body.userId;
  const event_id = req.body.eventId;
  console.log("req.body is", req.body);
  const queryText = `
    INSERT INTO "user_event" (user_id, event_id)
    VALUES ($1, $2);`;
  pool.query(queryText, [user_id, event_id]);
});

router.delete("/noRsvp/:id", (req, res) => {
    const event_id = req.body.eventId;
    console.log(req.params.id,'this is the event id')
    const queryText = `
    DELETE FROM "user_event" WHERE "user_id" = $1 AND "event_id" = $2;`;
    console.log('this is the query text for the delete route', queryText)
    pool.query(queryText, [req.user.id, req.params.id])
    .then(result => {
        res.sendStatus(200)
        console.log('successful RSVP delete server side')
    })
    .catch(error => {
        console.log('error in rsvp DELETE route server side', error)
        res.sendStatus(500)
    })
});

module.exports = router;
