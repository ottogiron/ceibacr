var _ = require('lodash');


var Node = function(data) {

    if(!(this instanceof Node)){
        return new Node(data);
    }

    _.merge(this, data);
};


module.exports = Node;
