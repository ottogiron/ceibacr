require('chai').should();
var Repository = require('../lib/repository');
var Client = require('../lib/client');
var Node = require('../lib/node');


describe('ceibacr repository', function() {

    var options = {
        port: 8080,
        hostname: 'localhost',
        protocol: 'http',
        repository: 'sample'
    };

    var client;
    before(function(){

        var repository = new Repository(options);

        client = repository.login({
            user: 'admin',
            password: 'admin'
        }, 'default');

    });


    it('should return a node by path', function(done){

        var path = '/';
        client.getNode(path, function(err, node){

            node.should.be.instanceof(Node);
            node.should.have.property('id');
            done();
        });
    });

});
