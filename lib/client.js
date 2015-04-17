var Node = require('./node');
var _ = require('lodash');
var path = require('path');

var Client = function(repository, clientAdapter) {

    if(!(this instanceof Client)) {
        return new Client(repository, clientAdapter);
    }

    this.clientAdapter = clientAdapter;
    this.repository = repository;
};

Client.prototype.getNode = function() {

    var depth = 0;
    var path, callback, depth;
    path = arguments[0];
    if(arguments.length === 2){
        callback = arguments[1];
    }
    else if(arguments.length === 3) {
        callback = arguments[2];
        depth = arguments[1];
    }

    var options = {
        path: path
    };

    if(depth){
        options.depth = depth;
    }
    var self = this;
    this.clientAdapter.getNode(options, function(err, result) {

        var node = Node(self,result);
        return callback(err, node);
    });
}


Client.prototype.getNodeByIdentifier = function(id, callback) {

    var self = this;
    this.clientAdapter.getNodeByIdentifier({ id: id }, function(err, result){

        var node = Node(self, result);
        return callback(err, node);
    });
};


Client.prototype.getPath = function(node) {

    return this.clientAdapter.getPath(node);
};


Client.prototype.getParentPath = function(node) {

    return this.clientAdapter.getParentPath(node);
};


Client.prototype.getName = function(node) {

    return this.clientAdapter.getName(node);
};


Client.prototype.getIdentifier = function(node) {

    return this.clientAdapter.getIdentifier(node);
};


Client.prototype.getChildren = function(node, callback) {

    var self = this;
    this.clientAdapter.getChildren(node, function(err, children) {

        /* istanbul ignore if  */
        if(err) { return callback(err) };
        var nodeChildren = _.map(children, function(nodeChild, index) {

            return Node(self, nodeChild);
        });

        return callback(null, nodeChildren);
    });
};


Client.prototype.removeNode = function(node, callback) {

    var options = { id: node.id };
    this.clientAdapter.deleteNodeByIdentifier(options, callback);
};


Client.prototype.addNode = function(parentNode, newNodeRelativePath, nodeData, callback) {

    var self = this;
    var childPath = path.join(parentNode.path, newNodeRelativePath);
    var options = { path: childPath };
    this.clientAdapter.addNode(options, nodeData, function(err, createdNodeData) {

        /* istanbul ignore if  */
        if(err) { return callback(err) };
        var createdNode = Node(self, createdNodeData);
        return callback(null, createdNode);
    });
}


Client.prototype.setProperties = function(node, properties, callback) {

    var options = { id: node.identifier };
    this.clientAdapter.updateNodeByIdentifier(options, properties, function(err, res){
        /* istanbul ignore if  */
        if(err) { return callback(err) };
        return callback(null, node);
    });
};


module.exports = Client;
