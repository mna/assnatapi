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
