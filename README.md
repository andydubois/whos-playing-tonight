# Who's Playing Tonight?

“Who’s Playing Tonight?” is an event planning app to be used with a group of friends to communicate which concerts are happening in the area for known bands or to share newer bands (and YouTube links to music) playing in the area.  It’s based around a calendar home page that displays the events for the current month which, when clicked, allows users to get details on show information, band information, and what shows friends have been going to lately.

Duration: 2 week sprint


# Installation

1. Create a database named "whos-playing-tonight"
2. The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
3. Open up your editor of choice and run an npm install
4. Run npm run server in your terminal
5. Run npm run client in your terminal
6. The npm run client command will open up a new browser tab for you!

# Screenshots



# Application Features

Login/Register page - login to or create a profile with an email address

View added events on calendar

Can click on link at top for week view of shows

See event page which has date, location, time, and what friends are attending a show, as well as the ability to RSVP for event.

View specific band pages to see past/future shows in app, as well as any added youtube links to their music

Personal profile page with list of past/future events, and ability to change password

Add new show page allows for adding bands, set times, address (with an autocomplete form for address)  and date of show

Admin page allows for deletion of events or users.

A pop-out navigation bar that allows users to navigate to the home page, personal profile page, or add bands page

# Built With

React, Redux, Node.js, Express, PostgreSQL, Material UI, Bootstrap, Moment.js

# Acknowledgement

Thanks to Prime Digital Academy in Minneapolis who equipped and helped me to make this application a reality.
