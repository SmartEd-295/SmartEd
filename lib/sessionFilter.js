'use strict';

module.exports = {

    checkSessionVisit: function(req, res, next) {
        if (req.session.smartedVisitId) {
            next();
        } else {
            console.log('Redirect to Login Page');
            //res.redirect(url);
        }
    }
};
