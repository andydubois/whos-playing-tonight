const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "music".url, "bands".band_name, "bands".id FROM "bands"
    FULL JOIN "music" ON "bands".id="music".band_id
    WHERE "bands".id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side band music GET", error);
      res.sendStatus(500);
    });
});

router.get("/pastShows/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "events".date, "events".id as event_id, "bands".band_name, "bands".id as band_id FROM "bands"
    JOIN "band_event" ON "bands".id="band_event".band_id
    JOIN "events" ON "band_event".event_id="events".id
    WHERE "bands".id=$1 AND "events".date < CURRENT_DATE;`;
  pool
    .query(queryText, [req.params.id])
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side past shows GET", error);
      res.sendStatus(500);
    });
});

router.get("/futureShows/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "events".date, "events".id as event_id, "bands".band_name, "bands".id as band_id FROM "bands"
    JOIN "band_event" ON "bands".id="band_event".band_id
    JOIN "events" ON "band_event".event_id="events".id
    WHERE "bands".id=$1 AND "events".date >= CURRENT_DATE;`;
  pool
    .query(queryText, [req.params.id])
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side future shows GET", error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/addMusic/:id", rejectUnauthenticated, (req, res) => {
  const bandId = req.params.id
  const url = req.body.ytLink
  const queryText = `
  INSERT INTO music (band_id, url) VALUES ($1, $2);`;
  pool.query(queryText, [bandId, url])
  .then(result => {
    res.sendStatus(200);
    console.log("successful newMusic POST server side");
  })
  .catch(error => {
    console.log("error in server side music POST", error);
    res.sendStatus(500);
  })
});

module.exports = router;
