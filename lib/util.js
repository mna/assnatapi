/*jshint asi:true, trailing:true*/

// Underscore-like extend object
module.exports.extend = function(obj) {
  var args = Array.prototype.slice.call(arguments, 1)
  
  args.forEach(function(source) {
    for (var prop in source) {
      obj[prop] = source[prop]
    }
  })
  return obj
}

/*
** normalizeCriteria()
**
** Take a criteria object (typically, a parsed query string object) and a specifications object
** and whitelists criteria according to the specs.
**
** specs format:
** key: name of a field to act upon
** value: either a boolean (true: allow, false: ignore) or an object:
**   - isBoolean: true if the criterion is a boolean
**   - trueValues: array of values to be considered true (strings), defaults to ['true', '1']
**   - falseValues: array of values to be considered false (strings), defaults to null (uses trueValues)
**   - mapTo: name of a key to use instead of this key (ex.: "a" provided as a shorthand for "active")
**   - mapReverseValue: boolean. In the case of a boolean value, maps to "mapTo" and reverses the boolean value (true<->false)
*/
module.exports.normalizeCriteria = function(crit, specs) {
  var res = {},
    val,
    falseVals,
    trueVals

  if (!crit || !specs) {
    return crit
  }

  for (var key in specs) {
    val = crit[key]
    if (typeof val !== 'undefined') {
      if (specs[key].isBoolean) {
        trueVals = specs[key].trueValues || ['true', '1']
        falseVals = specs[key].falseValues

        val = (falseVals && falseVals.length ? falseVals.indexOf(val) < 0 : trueVals.indexOf(val) >= 0)
      }
      if (specs[key].mapTo) {
        // Override res[key], no matter if something was present. Do not send incoherent criteria.
        res[specs[key].mapTo] = (specs[key].isBoolean && specs[key].mapReverseValue ? !val : val)
      } else {
        // Set the key as is on the result object
        res[key] = val
      }
    }
  }
  return res
}
