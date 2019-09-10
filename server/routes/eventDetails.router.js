const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/:id", (req, res) => {
  const queryText = `
  SELECT "bands".band_name, "locations".location_name, "locations".city, "locations".number_street, "locations".state, "locations".zip_code, "events".date, "events".id, "events".time_doors, "events".time_show
  FROM "events"
  JOIN "band_event" ON "events".id="band_event".event_id
  JOIN "locations" ON "events".locations_id="locations".id
  JOIN "bands" ON "band_event".band_id="bands".id
  WHERE "events".id=$1;`;
  pool.query(queryText, [req.params.id])
  .then(results => {
      res.send(results.rows[0]);
      console.log(results.rows[0]);
  })
  .catch(error => {
      console.log('error in server side event details GET', error);
      res.sendStatus(500);
  });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
