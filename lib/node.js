var _ = require('lodash');


var Node = function(clientAdapter, data) {

    if(!(this instanceof Node)){
        return new Node(clientAdapter,data);
    }

    this.clientAdapter = clientAdapter;
    _.merge(this, data);
};


module.exports = Node;
