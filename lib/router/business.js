/*jshint asi:true, trailing:true*/

var routes = []

routes.push({
  path: '/travaux',
  handler: 'getMetas'
})

routes.push({
  path: '/travaux/:idSsn',
  handler: 'getMetasForSession'
})

routes.push({
  path: '/travaux/:idSsn/:volNo',
  handler: ['loadMeta', 'getMeta']
})

routes.push({
  path: '/travaux/:idSsn/:volNo/interventions',
  handler: ['loadMeta', 'getMetaInterventions']
})

module.exports = routes
