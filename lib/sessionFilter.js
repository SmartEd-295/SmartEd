'use strict';

module.exports = {
    /* ------------------------------------------------------FILTER FOR CHECKING VALID SESSION ID--------------------------------------------------------------------------------------------*/
    checkSessionVisit: function (req, res, next) {
        if (req.session.smartedVisitId) {
            next();
        } else {
            //TODO : REDIRECT TO GENERIC SESSION PAGE
        }
    }
};
