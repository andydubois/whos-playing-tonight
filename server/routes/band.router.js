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
    JOIN "music" ON "bands".id="music".band_id
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
    SELECT "events".date, "bands".band_name, "bands".id FROM "bands"
    JOIN "band_event" ON "bands".id="band_event".band_id
    JOIN "events" ON "band_event".event_id="events".id
    WHERE "bands".id=$1 AND "events".date < CURRENT_DATE;`;
  pool
    .query(queryText, [req.params.id])
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side shows GET", error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
