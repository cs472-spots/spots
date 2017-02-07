# Spots

Spots is a Parking monitoring and notification system that will consist of: a
database to store user accounts and parking spot information; hardware sensors
to enforce parking spot check-in, validation enforcement, and parking spot
monitoring; a mobile app to enable the user to view available parking spots,
register an account, and get parking spot notifications; and a web server that
will handle the communication between all components.

## Development

### Server
To start the server locally, run
```
node server/index.js
```

If you're trying to expose the server publically, first start `ngrok`. See
installation instructions [here](https://ngrok.com/download). Add its location to your path.

```
ngrok http 3000
```

### Deploy to Heroku

After installing the Heroku CLI tool, login to heroku with `heroku login`. Since
we are only deploying the server directory, make sure that it is your current
working directory.

```
npm run deploy
```

