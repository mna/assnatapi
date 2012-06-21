/*jshint asi:true, trailing:true*/

var routes = []

routes.push({
  path: '/interventions',
  handler: 'getInterventions'
})

routes.push({
  path: '/interventions/:idInt',
  handler: ['loadIntervention', 'getIntervention']
})

module.exports = routes
