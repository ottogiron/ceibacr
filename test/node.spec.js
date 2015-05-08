require('chai').should();
var Repository = require('../lib/repository');
var Client = require('../lib/client');
var Node = require('../lib/node');
var Config = require('./config');
var path = require('path');

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


    it('should return a node child', function(done) {

        var path = '/', childPath = '/jcr:system';

        client.getNode(path, function(err, node) {

            var childRelativePath = 'jcr:system';
            node.getNode(childRelativePath, function(err, childNode) {

                childNode.path.should.be.equal(childPath);
                done();
            });
        });
    });


    it('should add a new child node', function(done) {

          var nodeToAdd = {
                "jcr:primaryType":"nt:unstructured"
          };

         var parentPath = '/';
         var relativePath = 'test';
         var fullPath = path.join(parentPath, relativePath);
        client.getNode(parentPath, function(err, node) {

            node.addNode(relativePath, nodeToAdd, function(err, addedNode) {

                addedNode.path.should.contain(fullPath);
                addedNode.remove(function(){
                    done();
                });
            });
        });

    });


    it('should update  properties', function(done) {

        var nodeToAdd = {
              "jcr:primaryType":"nt:unstructured"
        };

        var parentPath = '/';
        var relativePath = 'testupdate';
        var fullPath = path.join(parentPath, relativePath);
        client.getNode(parentPath, function(err, node) {

          node.addNode(relativePath, nodeToAdd, function(err, addedNode) {

              addedNode.setProperties({
                  testProperty: 'testValue'
              }, function(){

                 client.getNode(addedNode.path, function(err, modifiedNode) {

                    modifiedNode.testProperty.should.be.equal('testValue');
                    addedNode.remove(function(){
                        done();
                    });
                 });
              });


          });
        });
    });

});
