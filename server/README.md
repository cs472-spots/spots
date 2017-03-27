#Spots Server

#Development
Be sure you are in the server directory and run `npm install`. Start the server
locally by runnning `npm start`.  It will begin listening on port 5000.

If you're trying to expose the server publically, first start `ngrok`. See
installation instructions [here](https://ngrok.com/download). Add its location to your path.

```
ngrok http 5000
```
You'll need to use the url provided by the cli app.
