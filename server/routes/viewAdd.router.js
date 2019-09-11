const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get("/", (req, res) => {
    const queryText = `
    SELECT * FROM "bands";`;
    pool.query(queryText)
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('error in server side band get', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
