/*jshint regexdash:true*/
var rxNumber = /^\s*\d+\s*$/,
  me = {DEFAULT_LIMIT: 1000}

/*
** extend(target, src1, src2, ...)
**
** Extend a given object by copying each property of the following object(s) to it.
** The last object in the list wins if there is a name conflict. This is more or less
** the same as Underscore extend().
*/
me.extend = function(obj) {
  var args = Array.prototype.slice.call(arguments, 1)

  if (!obj) {
    return obj
  }

  args.forEach(function(source) {
    for (var prop in source) {
      obj[prop] = source[prop]
    }
  })
  return obj
}

/*
** buildOptionsObject(qs)
**
** Takes a parsed query string object, and builds a full options object, with
** the sort criteria, the limit value, and the skip value, ready to be used
** by db.collection.find().
*/
me.buildOptionsObject = function(qs) {
  var opts = {},
    limit = me.getLimitValue(qs),
    skip = me.getSkipValue(qs),
    sort = me.getSortObject(qs)

  // Limit is always present
  opts.limit = limit

  // Skip is present only if != 0
  if (skip) {
    opts.skip = skip
  }

  // Sort is present only if specified in query string
  if (sort) {
    opts.sort = sort
  }

  return opts
}

/*
** getSkipValue(qs)
**
** Takes a parsed query string object, and looks for a "skip" key. If there is one, and it is
** a valid number, then it uses this value as the number of objects to skip before starting
** to return documents.
*/
me.getSkipValue = function(qs) {
  var val

  if (qs && qs.skip) {
    if (rxNumber.test(qs.skip)) {
      val = parseInt(qs.skip, 10)
    }
  }

  return val
}

/*
** getLimitValue(qs)
**
** Takes a parsed query string object, and looks for a "limit" key. If there is one, and it is
** a valid number, then it uses this value as the limit of objects returned.
*/
me.getLimitValue = function(qs) {
  var val

  if (qs && qs.limit) {
    if (rxNumber.test(qs.limit)) {
      val = Math.min(parseInt(qs.limit, 10), me.DEFAULT_LIMIT)
    }
  }

  return val || me.DEFAULT_LIMIT
}

/*
** getSortObject(qs)
**
** Takes a parsed query string object, and looks for a "sort" key. If there is one, then a sort
** object will be returned. Sort fields are specified as a comma-separated list of fields, and
** a descending sort may be specified by prefixing the field with a minus (-).
*/
me.getSortObject = function(qs) {
  var sort = {},
    vals,
    val

  if (!qs || !qs.sort) {
    return null
  }

  vals = qs.sort.split(',')
  for (var i = 0; i < vals.length; i++) {
    val = vals[i].trim()
    if (val.substr(0, 1) === '-') {
      sort[val.substr(1)] = -1
    } else {
      sort[val] = 1
    }
  }
  return sort
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
**   - wrapInRegex: true if the value should be escaped and wrapped in a regular expression (i.e.: /val/i)
**   - trueValues: array of values to be considered true (strings), defaults to ['true', '1']
**   - falseValues: array of values to be considered false (strings), defaults to null (uses trueValues)
**   - mapTo: name of a key to use instead of this key (ex.: "a" provided as a shorthand for "active")
**   - mapReverseValue: boolean. In the case of a boolean value, maps to "mapTo" and reverses the boolean value (true<->false)
*/
me.normalizeCriteria = function(crit, specs) {
  var res = {},
    val,
    falseVals,
    trueVals,
    startToken,
    endToken,
    isRegex

  if (!crit || !specs) {
    return null
  }

  for (var key in specs) {
    val = crit[key]
    if (typeof val !== 'undefined') {
      if (specs[key].isBoolean) {
        trueVals = specs[key].trueValues || ['true', '1']
        falseVals = specs[key].falseValues

        val = (falseVals && falseVals.length ? falseVals.indexOf(val) < 0 : trueVals.indexOf(val) >= 0)
      } else if (specs[key].wrapInRegex) {
        // If starts with '*', make a endsWith search
        // If ends with '*', make a startsWith search
        // If starts and ends with '*', make a contains search
        // If no '*' at all, do not use a regex, make an exact match criteria
        startToken = ''
        endToken = ''
        if (val.substr(val.length - 1, 1) === '*') {
          startToken = '^'
          val = val.substr(0, val.length - 1)
        }
        if (val.substr(0, 1) === '*') {
          endToken = '$'
          val = val.substr(1)
        }
        isRegex = (startToken || endToken)
        if (startToken && endToken) {
          // Starts and ends with '*', so no start and end token in regex
          startToken = ''
          endToken = ''
        }
        if (isRegex) {
          val = new RegExp(startToken + me.escapeForRegex(val) + endToken, 'i')
        }
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

/*
** escapeForRegex(src)
**
** Escapes a given string for use in a regular expression.
*/
me.escapeForRegex = function(src) {
  if (!src) {
    return src
  }
  return src.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

module.exports = me
