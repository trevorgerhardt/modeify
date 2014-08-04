var config = require('config');
var d3 = require('d3');
var debug = require('debug')(config.name() + ':filter-view');
var view = require('view');

/**
 * Expose `View`
 */

var View = module.exports = view(require('./template.html'));

/**
 * On construct
 */

View.on('construct', function(view, plan) {
  view.reactive.use(require('reactive-select'));

  view.on('active', function() {
    plan.updateRoutes();
  });

  view.on('selected', function() {
    plan.updateRoutes();
  });
});

/**
 * Start Times
 */

View.prototype.startTimes = function() {
  var opts = [];
  for (var i = 0; i <= 23; i++) opts.push(toTime(i));
  return opts;
};

/**
 * End Times
 */

View.prototype.endTimes = function() {
  var opts = [];
  for (var i = 1; i <= 24; i++) opts.push(toTime(i));
  return opts;
};

/**
 * Parse Int
 */

View.prototype.parseInt = parseInt;

/**
 * Number to formatted time
 */

function toTime(n) {
  var opt = {
    name: '',
    value: n
  };

  if (n > 23 || n === 0) opt.name = 'Midnight';
  else if (n > 12) opt.name = n - 12 + ':00 pm';
  else if (n === 12) opt.name = 'Noon';
  else opt.name = n + ':00 am';

  return opt;
}
