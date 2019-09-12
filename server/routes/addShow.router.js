const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

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

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;