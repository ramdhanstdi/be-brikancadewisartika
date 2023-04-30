const dropbox = require('express').Router()

dropbox.get('/grant', (req, res, next)=> {
  const options = {
    hostname: 'www.dropbox.com',
    pathname: 'oauth2/authorize',
    method: 'GET',
    query: {
      client_id: process.env.CLIENT_ID,
      response_type: 'code',
      redirect_uri: process.env.REDIRECT_URL
    }
  }
})