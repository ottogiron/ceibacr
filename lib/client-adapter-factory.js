var ModeShapeRestClient = require('modeshape-rest-client');


module.exports.getAdapter = function(options) {

   return new ModeShapeRestClient(options);
}
