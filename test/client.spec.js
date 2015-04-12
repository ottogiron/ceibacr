require('chai').should();
var expect = require('chai').expect;
var Repository = require('../lib/repository');
var Client = require('../lib/client');
var Node = require('../lib/node');
var Config = require('./config');
var _ = require('lodash');

describe('ceibacr client', function() {


    var client;
    before(function(){

        var repository = new Repository(Config.repositoryOptions);

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


    it('should return a node by identifier', function(done) {

        var path = '/jcr:system';
        client.getNode(path, function(err, node){

            node.should.be.instanceof(Node);
            node.should.have.property('id');


            client.getNodeByIdentifier(node.id, function(err, nodeById) {

               nodeById.should.be.instanceof(Node);
               nodeById.should.have.property('id');
               nodeById.id.should.be.equal(node.id);
               done();
            });
        });
    });


    it('should return a node path', function(done) {

        var path = '/jcr:system';
        client.getNode(path, function(err, node) {

            var nodePath = client.getPath(node);
            nodePath.should.be.equal(path);
            done();
        });
    });


    it('should return a node parent path', function(done) {

        var path = '/jcr:system', parentPath = '/';
        client.getNode(path, function(err, node) {

            var nodeParentPath = client.getParentPath(node);
            nodeParentPath.should.equal(parentPath);
            done();
        });
    });


    it('should return a node name', function(done) {

        var path = '/jcr:system', name = 'jcr:system';
        client.getNode(path, function(err, node) {

            var nodeName = client.getName(node);
            nodeName.should.be.equal(name);
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


    it('should return a node children', function(done) {

        var path = '/';
        client.getNode(path, function(err, node) {

            client.getChildren(node, function(err, children) {

                children.should.be.an('array');
                children.should.have.length.above(0);                
                var jcrSystemNode = _.find(children, { name: 'jcr:system'});
                expect(jcrSystemNode).to.be.instanceof(Node);
                done();
            });
        });
    });

});
