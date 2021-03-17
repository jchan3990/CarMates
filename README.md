# CarMates
Social media app for car enthusiasts to interact with other local / global enthusiasts.

## Usage ##
> Webpack compile 'npm run react-dev'
```
webpack -d --watch
```
> Start server 'npm start'
```
nodemon server/index.js
```

## Database ##
Will need to configure mongoDB for database.
* Need a config.js for your API key
  * MONGODB key to connect to database (db/server/index.js).
  * SECRET_KEY string to generate user login Bearer token (db/resolvers/users.js).
  * gMapsKey Google API key for Google Maps and Google Geocoder.

## Requirements ##
An `nvmrc` file is included if using [nvm](https://github.com/nvm-sh/nvm).
* Node v14.2.0
* etc

## Development ##
From within the root directory:
```
npm install
```
