'use strict';

var constant = require('../../lib/constants'),
    canvasConnectivity = require('../../lib/canvasAPI');

module.exports = function (router) {

    router.get('/getAllFiles/:courseId/:userEmail', function (req, res) {
        var courseId = req.params.courseId;
        var userEmail = req.params.userEmail;

        var apiUrl = constant.MESSAGE_MAP.get('CANVAS_GET_ALL_FILES');
        apiUrl = apiUrl.replace(':course_id', courseId);
        canvasConnectivity.getCanvasDetails(apiUrl, userEmail, function (err, body) {
            if(!err){
                //console.log("In student index API success :-----> " + body);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
            }else{
                res.status(400).send(constant.MESSAGE_MAP.get('CANVAS_CONNECTION_FAILED'));
            }
        });
    });

};
