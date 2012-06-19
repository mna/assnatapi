/*jshint asi:true, trailing:true*/

var routes = []

routes.push({
  path: '/deputes',
  handler: 'getDeputies'
})

routes.push({
  path: '/deputes/:idDep',
  handler: 'getDeputy'
})

routes.push({
  path: '/deputes/:idDep/interventions',
  handler: 'getDeputyInterventions'
})

routes.push({
  path: '/deputes/:idDep/interventions/:idInt',
  handler: 'getDeputyIntervention'
})

module.exports = routes
