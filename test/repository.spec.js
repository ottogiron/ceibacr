var Repository = require('../lib/repository');
var Client = require('../lib/client');
var Config  = require('./config');
require('chai').should();

describe('ceibacr repository', function() {


    it('should initialize a new repository session', function(){

        var repository = new Repository(Config.repositoryOptions);

        var client = repository.login({
            user: 'admin',
            password: 'admin'
        }, 'default');

        client.should.be.instanceof(Client);
    });

    it('should initialize a new repository using Repository as factory', function() {

        var repository = Repository(Config.repositoryOptions);
        repository.should.be.instanceof(Repository);
    });
});
