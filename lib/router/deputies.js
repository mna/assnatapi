var routes = []

routes.push({
  path: '/deputies',
  handler: 'getDeputies'
})

routes.push({
  path: '/deputies/:idDep',
  handler: ['loadDeputy', 'getDeputy']
})

routes.push({
  path: '/deputies/:idDep/interventions',
  handler: ['loadDeputy', 'getDeputyInterventions']
})

routes.push({
  path: '/deputies/:idDep/interventions/:idInt',
  handler: ['loadDeputy', 'getDeputyIntervention']
})

module.exports = routes
