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
<<<<<<< HEAD
=======

##Environment variables
Store a `.evn` file at the root of the server directory with the following
environment variables. For example:
```
FIREBASE_TYPE="service_account"
FIREBASE_PROJECT_ID="spots-xxxxx"
FIREBASE_PRIVATE_KEY_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
FIREBASE_PRIVATE_KEY="PRIVATE-SSH-KEY"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-t2l1t@spots-cba38.iam.gserviceaccount.com"
FIREBASE_CLIENT_ID="117655956091999374393"
FIREBASE_AUTH_URL="https://accounts.google.com/o/oauth2/auth"
FIREBASE_TOKEN_URI="https://accounts.google.com/o/oauth2/token"
FIREBASE_AUTH_PROVIDER_CERT_URL="https://www.googleapis.com/oauth2/v1/certs"
FIREBASE_CLIENT_CERT_URL="https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t2l1t%40spots-cba38.iam.gserviceaccount.com"

BUILD="development" # set this in your testing enviroment as is here
                    # use api key '1234' for testing
```
>>>>>>> 76645babd0b9a909616b3f3d58ebb033b7399e74
