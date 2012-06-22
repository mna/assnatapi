var noevil = require('see-no-evil'),
  restify = require('restify'),
  util = require('../util')

module.exports = function(db) {
  var common = require('./common'),
    handler = {}

  /*
  ** Meeting object:
  ** - status : the status of the parliament business day ("Préliminaire", "Finale" is definitive)
  ** - session : the parliament session (LL.SS : législative.session)
  ** - day : the day of the week of the business, in French
  ** - date : the date of the business
  ** - id : the ID of the business, in Vol.No format
  ** - interventionsPath : the path to the interventions of this business day
  */

  function augmentMeeting(meet) {
    meet.interventionsPath = '/meetings/' + meet.id + '/interventions'
  }

  handler.getMeetings = function(req, res, next) {
    var wrap = noevil({
      error: next
    })

    db.meetings.getAll(req.query, wrap(function(nul, meets) {
      meets.forEach(augmentMeeting)
      res.send(meets)
      return next()
    }))
  }

  handler.loadMeeting = function(req, res, next) {
    var wrap = noevil({
      error: next
    })

    db.meetings.get(req.params.idMeeting, wrap(function(nul, meet) {
      if (meet) {
        req.params.meet = meet
        return next()
      } else {
        res.send(new restify.ResourceNotFoundError('L\'identifiant de séance demandé n\'existe pas.'))
      }
    }))
  }

  handler.getMeeting = function(req, res, next) {
    augmentMeeting(req.params.meet)
    res.send(req.params.meet)
    return next()
  }

  handler.getMeetingInterventions = function(req, res, next) {
    var wrap = noevil({
      error: next
    })

    util.extend(req.query, {meeting: req.params.idMeeting})
    db.interventions.getAll(req.query, wrap(function(nul, ints) {
      ints.forEach(common.augmentIntervention)
      res.send(ints)
      return next()
    }))
  }

  handler.getMeetingIntervention = function(req, res, next) {
    var wrap = noevil({
      error: next
    })

    db.interventions.get(req.params.idInt, wrap(function(nul, intr) {
      if (intr && intr.meetingId === req.params.idMeeting) {
        common.augmentIntervention(intr)
        res.send(intr)
      } else {
        if (intr) {
          res.send(new restify.ResourceNotFoundError('L\'identifiant d\'intervention demandé n\'existe pas pour la séance spécifiée.'))
        } else {
          res.send(new restify.ResourceNotFoundError('L\'identifiant d\'intervention demandé n\'existe pas.'))
        }
      }
      return next()
    }))
  }

  return handler
}
