var ClientAdapterFactory = require('./client-adapter-factory');
var Client = require('./client');
var _ = require('lodash');

var internals = {
    defaultOptions: {
        port: 8080,
        hostname: 'localhost',
        protocol: 'http'
    }
}

var Repository = function(options){

    if(!(this instanceof Repository)) {
        return new Repository(options);
    }

    this.options = _.defaults(options, internals.defaultOptions);
};


Repository.prototype.login = function(credentials, workspaceName) {

    var options = _.clone(this.options);
    options.user = credentials.user;
    options.password = credentials.password;
    options.workspace = workspaceName;

    var clientAdapter = ClientAdapterFactory.getAdapter(options);
    var client = new Client(clientAdapter);
    return client;
};


module.exports = Repository;
