const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  const queryText = `
  SELECT "bands".band_name, "events".date, "events".id FROM "events"
  JOIN "band_event" ON "events".id="band_event".event_id
  JOIN "bands" ON "band_event".band_id="bands".id;`;
  pool
    .query(queryText)
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
