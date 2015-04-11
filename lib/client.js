var Node = require('./node');

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

    this.clientAdapter.getNode(options, function(err, result) {

        var node = Node(this,result);
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





module.exports = Client;
