

var Client = function(clientAdapter) {

    if(!(this instanceof Client)) {
        return new Client(clientAdapter);
    }

    this.clientAdapter = clientAdapter;
};


module.exports = Client;
