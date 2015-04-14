var _ = require('lodash');
var path = require('path');

var Node = function(client, data) {

    if(!(this instanceof Node)){
        return new Node(client, data);
    }

    this.client = client;
    _.merge(this, data);
};


Object.defineProperty(Node.prototype, 'path', {
    enumerable: true,
    get: function(){

        return this.client.getPath(this);
    }
});


Object.defineProperty(Node.prototype, 'parentPath', {
    enumerable: true,
    get: function() {

        return this.client.getParentPath(this);
    }
});


Object.defineProperty(Node.prototype, 'identifier', {
    enumerable: true,
    get: function() {

        return this.client.getIdentifier(this);
    }
});


Object.defineProperty(Node.prototype, 'name', {
    enumerable: true,
    get: function() {

        return this.client.getName(this);
    }
});


Node.prototype.getNode = function(relativePath, callback) {

    var absPath = path.join(this.path, relativePath);
    this.client.getNode(absPath, function(err, childNode) {

        return callback(err, childNode);
    });

};


Node.prototype.getNodes = function(callback) {

    this.client.getChildren(this, callback);    
};


module.exports = Node;
