var bizRoutes = require('./business'),
  depRoutes = require('./deputies'),
  assRoutes = require('./assets'),
  intRoutes = require('./interventions')

// Combine all routes
module.exports = bizRoutes.concat(depRoutes.concat(assRoutes.concat(intRoutes)))
