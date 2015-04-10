require('chai').should();
var Repository = require('../lib/repository');
var Client = require('../lib/client');
var Node = require('../lib/node');


describe('ceibacr client', function() {

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


    it('should return a node by path and children depth', function(done) {

        var path = '/';
        var depth = 1;
        client.getNode(path, depth, function(err, node) {

            node.should.be.instanceof(Node);
            node.should.have.property('id');
            done();
        });
    });

});
