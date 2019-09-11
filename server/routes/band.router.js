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
      console.log("error in server side shows GET", error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
