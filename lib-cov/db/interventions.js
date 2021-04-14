/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['db/interventions.js']) {
  _$jscoverage['db/interventions.js'] = [];
  _$jscoverage['db/interventions.js'][1] = 0;
  _$jscoverage['db/interventions.js'][12] = 0;
  _$jscoverage['db/interventions.js'][13] = 0;
  _$jscoverage['db/interventions.js'][17] = 0;
  _$jscoverage['db/interventions.js'][18] = 0;
  _$jscoverage['db/interventions.js'][19] = 0;
  _$jscoverage['db/interventions.js'][24] = 0;
  _$jscoverage['db/interventions.js'][25] = 0;
  _$jscoverage['db/interventions.js'][29] = 0;
  _$jscoverage['db/interventions.js'][30] = 0;
  _$jscoverage['db/interventions.js'][31] = 0;
}
_$jscoverage['db/interventions.js'][1]++;
var connect = require("./connect"), noevil = require("see-no-evil"), util = require("../util"), CriteriaSpec = {meeting: {mapTo: "meetingId"}, deputy: {mapTo: "deputyId"}, subject: {wrapInRegex: true}, district: {wrapInRegex: true}, party: {wrapInRegex: true}};
_$jscoverage['db/interventions.js'][12]++;
module.exports.get = (function (intId, cb) {
  _$jscoverage['db/interventions.js'][13]++;
  var wrap = noevil({error: cb});
  _$jscoverage['db/interventions.js'][17]++;
  connect.ensureConnected(wrap((function (nul, db) {
  _$jscoverage['db/interventions.js'][18]++;
  db.collection("interventions", wrap((function (nul, intsColl) {
  _$jscoverage['db/interventions.js'][19]++;
  intsColl.findOne({id: intId}, cb);
})));
})));
});
_$jscoverage['db/interventions.js'][24]++;
module.exports.getAll = (function (qs, cb) {
  _$jscoverage['db/interventions.js'][25]++;
  var wrap = noevil({error: cb});
  _$jscoverage['db/interventions.js'][29]++;
  connect.ensureConnected(wrap((function (nul, db) {
  _$jscoverage['db/interventions.js'][30]++;
  db.collection("interventions", wrap((function (nul, intsColl) {
  _$jscoverage['db/interventions.js'][31]++;
  intsColl.find(util.normalizeCriteria(qs, CriteriaSpec), util.buildOptionsObject(qs)).toArray(cb);
})));
})));
});
_$jscoverage['db/interventions.js'].source = ["var connect = require('./connect'),","  noevil = require('see-no-evil'),","  util = require('../util'),","  CriteriaSpec = {","    meeting: {mapTo: 'meetingId'},","    deputy: {mapTo: 'deputyId'},","    subject: {wrapInRegex: true},","    district: {wrapInRegex: true},","    party: {wrapInRegex: true}","  }","","module.exports.get = function(intId, cb) {","  var wrap = noevil({","    error: cb","  })","","  connect.ensureConnected(wrap(function(nul, db) {","    db.collection('interventions', wrap(function(nul, intsColl) {","      intsColl.findOne({id: intId}, cb)","    }))","  }))","}","","module.exports.getAll = function(qs, cb) {","  var wrap = noevil({","    error: cb","  })","","  connect.ensureConnected(wrap(function(nul, db) {","    db.collection('interventions', wrap(function(nul, intsColl) {","      intsColl.find(","        util.normalizeCriteria(qs, CriteriaSpec),","        util.buildOptionsObject(qs)","      ).toArray(cb)","    }))","  }))","}"];