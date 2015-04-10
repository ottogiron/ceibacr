var Repository = require('../lib/repository');
var Client = require('../lib/client');
require('chai').should();

describe('ceibacr repository', function() {

    var options = {
        port: 8080,
        hostname: 'localhost',
        protocol: 'http',
        repository: 'sample'
    };

    it('should initialize a new repository session', function(){

        var repository = new Repository(options);

        var client = repository.login({
            user: 'admin',
            password: 'admin'
        }, 'workspace');

        client.should.be.instanceof(Client);
    });

    it('should initialize a new repository using Repository as factory', function() {

        var repository = Repository(options);
        repository.should.be.instanceof(Repository);
    });
});
