// ./routes/index.js
const users = require('./user-api')
module.exports = app => {
  app.use('/', users)
  // etc..
}