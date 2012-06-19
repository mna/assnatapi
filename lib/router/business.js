/*jshint asi:true, trailing:true*/

var routes = []

routes.push({
  path: '/travaux',
  handler: 'getMetas'
})

routes.push({
  path: '/travaux/:idMeta',
  handler: ['loadMeta', 'getMeta']
})

routes.push({
  path: '/travaux/:idMeta/interventions',
  handler: ['loadMeta', 'getMetaInterventions']
})

routes.push({
  path: '/travaux/:idMeta/interventions/:idInt',
  handler: ['loadMeta', 'getMetaIntervention']
})

module.exports = routes
