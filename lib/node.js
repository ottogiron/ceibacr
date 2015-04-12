var _ = require('lodash');


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
})


module.exports = Node;
