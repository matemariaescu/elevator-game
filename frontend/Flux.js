var Fluxxor = require('fluxxor');

var Flux = new Fluxxor.Flux(require('./stores/stores'), require('./actions/actions'));

Flux.on('dispatch', function(type, payload) {
  console.log('[Dispatch]', type, payload);
});

module.exports = Flux;
