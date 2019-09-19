const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT * FROM "bands"
    ORDER BY "bands".band_name;`;
  pool
    .query(queryText)
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side band get", error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/addBand", rejectUnauthenticated, (req, res) => {
  const queryText = `
    INSERT INTO "bands" ("band_name") VALUES ($1);`;
  pool
    .query(queryText, [req.body.band])
    .then(result => {
      res.sendStatus(200);
      console.log("successful newBand POST server side");
    })
    .catch(error => {
      console.log("error in addBand POST server side", error);
      res.sendStatus(500);
    });
});

module.exports = router;
