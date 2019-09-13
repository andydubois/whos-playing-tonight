const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");

router.put("/first/:id", rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const queryText = `
UPDATE "events" SET locations_id=$1, date=$2, time_doors=$3, time_show=$4
WHERE id = $5;
`;
  pool
    .query(queryText, [
      req.body.venueId,
      req.body.showDate,
      req.body.doorTime,
      req.body.showTime,
      req.body.eventId
    ])
    .then(result => {
      const queryText2 = `
      UPDATE "band_event" SET band_id=$1 WHERE id=$2;`;
      pool.query(queryText2, [req.body.bandId, req.body.band_event_id])
        .then(result => {
          console.log("successful editEvent 2 PUT server side");
        })
        .catch(error => {
          console.log("error in editEvent 2 PUT server side", error);
          res.sendStatus(500);
        })
      res.sendStatus(200);
      console.log("successful editEvent 1 PUT server side");
    })
    .catch(error => {
      console.log("error in editEvent 1 PUT server side", error);
      res.sendStatus(500);
    });
});

// router.put("/second/:id", rejectUnauthenticated, (req, res) => {
//   console.log(req.body);
// });

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
