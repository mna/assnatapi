var routes = []

routes.push({
  path: '/meetings',
  handler: 'getMeetings'
})

routes.push({
  path: '/meetings/:idMeeting',
  handler: ['loadMeeting', 'getMeeting']
})

routes.push({
  path: '/meetings/:idMeeting/interventions',
  handler: ['loadMeeting', 'getMeetingInterventions']
})

routes.push({
  path: '/meetings/:idMeeting/interventions/:idInt',
  handler: ['loadMeeting', 'getMeetingIntervention']
})

module.exports = routes
