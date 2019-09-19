const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/allShows", rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT "bands".band_name, "events".date, "events".id FROM "events"
  JOIN "band_event" ON "events".id="band_event".event_id
  JOIN "bands" ON "band_event".band_id="bands".id
  ORDER BY "events".date DESC`;
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

//POST route template

router.delete("/bandDelete/:id", rejectUnauthenticated, async (req, res) => {
  const id = req.params.id;

  const connection = await pool.connect();
  try {
    //starts multi-state SQL "transaction"
    await connection.query("BEGIN");
    //deletes all band_event entries related to band
    const band_eventQuery = `
    DELETE FROM band_event WHERE band_id=$1 RETURNING event_id`;
    //save result in variable so we can retrieve returned value
    const result = await connection.query(band_eventQuery, [id]);
    //get the id's from the result
    const returnedIds = result.rows;
    console.log(result.rows);
    //set up individual SQL queries for each table that needs entries deleted
    //deletes all entries in use_event table
    const user_eventQuery = `
    DELETE FROM user_event WHERE event_id=$1`;
    //deletes all entries in events table
    const eventsQuery = `
    DELETE FROM events WHERE id=$1`;
    //delete all music related to band
    const musicQuery = `
    DELETE FROM music WHERE band_id=$1`;
    //delete band from band table
    const bandQuery = `
    DELETE FROM bands WHERE id =$1`;
    //run over id's in for loop to delete each in user_event and events table
    for (event of returnedIds) {
      await connection.query(user_eventQuery, [event.event_id]);
      await connection.query(eventsQuery, [event.event_id]);
    }
    await connection.query(musicQuery, [id]);
    await connection.query(bandQuery, [id]);
    //successful end to "transaction"
    await connection.query("COMMIT");
    console.log("Successful delete of band at index", id);
    res.sendStatus(201);
  } catch (error) {
    //reverts all statements in transaction
    await connection.query("ROLLBACK");
    console.log("error in server side band delete", error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.delete("/deleteShow/:id", rejectUnauthenticated, async (req, res) => {
  const id = req.params.id;

  const connection = await pool.connect();
  try {
    //starts multi-state SQL "transaction"
    await connection.query("BEGIN");
    //deletes all band_event entries related to band
    const band_eventQuery = `
    DELETE FROM band_event WHERE event_id=$1`;
    //deletes all entries in events table
    const eventsQuery = `
    DELETE FROM events WHERE id=$1`;
    //delete all entries in user_event table
    const user_eventQuery = `
    DELETE FROM user_event WHERE event_id=$1`;

    await connection.query(band_eventQuery, [id]);
    await connection.query(user_eventQuery, [id]);
    await connection.query(eventsQuery, [id]);
    //successful end to "transaction"
    await connection.query("COMMIT");
    console.log("Successful DELETE of show at index", id);
    res.sendStatus(201);
  } catch (error) {
    //reverts all statements in transaction
    await connection.query("ROLLBACK");
    console.log("error in server side show DELETE", error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.delete(`/deleteShow/:id`, rejectUnauthenticated, (req, res) => {
  console.log("i am the band deleter");
  const band_eventQuery = `
    DELETE FROM band_event WHERE event_id=$1;`;

  pool
    .query(band_eventQuery, [req.params.id])
    .then(result => {
      const eventQuery = `
    DELETE FROM events WHERE id=$1;`;
      pool
        .query(eventQuery, [req.params.id])
        .then(result => {
          console.log("successful DELETE of admin Show in event table");
        })
        .catch(error => {
          console.log("error in event table delete of band", error);
          res.sendStatus(500);
        });
      res.sendStatus(200);
      console.log("successful DELETE of show in band_event table");
    })
    .catch(error => {
      console.log("error in band_event DELETE of show", error);
      res.sendStatus(500);
    });
});

module.exports = router;
