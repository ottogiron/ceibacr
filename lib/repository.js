var ModeShapeRestClient = require('modeshape-rest-client');
var _ = require('lodash');

var internals = {
     defaultOptions: {
        port: 8080,
        hostname: 'localhost',
        protocol: 'http',
        context: 'modeshape-rest',
        workspace: 'default',
        repository: 'sample'
    },
};

var Repository = function(options){

    if(!(this instanceof Repository)) {

        return new Repository(name);
    }

    this.options = _.defaults(options, internals.defaultOptions);
};


Repository.prototype.login = function(credentials, workspaceName) {

    var modeShapeClientOptions = _.clone(this.options);
    modeShapeClientOptions.user = credentials.user;
    modeShapeClientOptions.password = credentials.password;

    var modeShapeRestClient = new ModeShapeRestClient(credentials);
};
