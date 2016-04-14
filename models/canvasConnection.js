'use strict';

var mongoose = require('mongoose');

module.exports = function CanvasConnectivity() {
    var canvasSchema = mongoose.Schema({
        email : String,
        token : String
    },{
        collection: 'canvasConnectivity'
    });

    return mongoose.model('canvas', canvasSchema);
};
