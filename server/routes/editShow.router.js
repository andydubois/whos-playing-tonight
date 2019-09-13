const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");



router.put("/:id", rejectUnauthenticated, (req, res) => {
  console.log(req.body)
  const queryText = `
UPDATE "events" SET locations_id=$1, date=$2, time_doors=$3, time_show=$4
WHERE id = $5;
UPDATE "band_event" SET band_id='$6' WHERE id=$7;`;
  pool.query(queryText, [req.body.venueId, req.body.showDate, req.body.doorTime, req.body.showTime, req.body.eventId, req.body.bandId, req.body.bandEventId])
  .then(result => {
    res.sendStatus(200)
    console.log('successful editEvent POST server side')
  })
  .catch(error => {
    console.log('error in editEvent POST server side', error)
    res.sendStatus(500)
  })
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
