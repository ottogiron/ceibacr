var _ = require('lodash');


var Node = function(client, data) {

    if(!(this instanceof Node)){
        return new Node(client, data);
    }

    this.client = client;
    _.merge(this, data);
};


module.exports = Node;
