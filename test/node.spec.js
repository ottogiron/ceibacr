require('chai').should();
var Repository = require('../lib/repository');
var Client = require('../lib/client');
var Node = require('../lib/node');
var Config = require('./config');

describe('ceibacr Node', function(){


    var client;
    before(function(){

        var repository = new Repository(Config.repositoryOptions);

        client = repository.login({
            user: 'admin',
            password: 'admin'
        }, 'default');

    });


    it('should get a node path', function(done) {

        var path = '/';
        client.getNode(path, function(err, node){

            node.path.should.be.equal(path);
            done();
        });
    });


    it('should get a node parent path', function(done) {

        var path = 'jcr:system', parentPath= '/';
        client.getNode(path, function(err, node) {

            node.parentPath.should.be.equal(parentPath);
            done();
        });
    });


    it('should return a node name', function(done) {

        var path = '/jcr:system', name = 'jcr:system';
        client.getNode(path, function(err, node) {

            node.name.should.be.equal(name);
            done();
        });
    });


    it('should return a node identifier', function(done) {

        var path = '/jcr:system';
        client.getNode(path, function(err, node) {

            var identifier = client.getIdentifier(node);
            identifier.should.be.equal(node.identifier);
            done();
        });
    });

});
