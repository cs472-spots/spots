# Spots

Spots is a Parking monitoring and notification system that will consist of: a
database to store user accounts and parking spot information; hardware sensors
to enforce parking spot check-in, validation enforcement, and parking spot
monitoring; a mobile app to enable the user to view available parking spots,
register an account, and get parking spot notifications; and a web server that
will handle the communication between all components.

## Development

Clone the project with
```
git clone https://git.heroku.com/unlv-spots.git
```

### Server
If you're developing on the server, first change directory to the server
directory and run `npm install`. Start the server locally by runnning `npm start`.
It will begin listening on port 5000.

If you're trying to expose the server publically, first start `ngrok`. See
installation instructions [here](https://ngrok.com/download). Add its location to your path.

```
ngrok http 5000
```

### Frontend

If you need the server for your frontend development, make
sure you followed the instructions on the previous section. Change directories to the frontend
directory from the root and install dependencies.
```
cd server/frontend # from the root of the project
npm install
```
The scripts run with that command will start a development server that publishes
the frontend to http://localhost:3000.

After saving your changes, the development server will automatically let you
see your changes on the webpage.

### Deploy to Heroku

Make sure you have the heroku CLI tool installed. Login to heroku with `heroku
login`. From the root of the project, run `bin/deploy`. Or just `deploy` if
`./bin` is in your $PATH. This will deploy the `server` directory from the
master branch
