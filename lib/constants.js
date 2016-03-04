    'use strict';

    var HashMap = require('hashmap');

    function define(name, value) {
        Object.defineProperty(exports, name, {
            value:      value,
            enumerable: true
        });
    }

    //  ------------------------------------------------------ COMMON ------------------------------------------------------------------

    define('REQUEST_HTTP', 'http://');
    define('REQUEST_HTTPS', 'https://');

    var statusCodes = [200, 201, 202, 203, 204, 205, 206];
    define('STATUS_CODES', statusCodes);

    //  -------------------------------------------------- MESSAGES DETAILS -------------------------------------------------------------

    var map = new HashMap();

    map.set("USER_EXIST","User already exist in the given environment.");
    map.set("REGISTER_FAILED","Registration Failed, please try again!");
    map.set("REGISTER_SUCCESS","Registration Successful, log in using credentials!");

    map.set("LOGIN_FAILED", "Invalid password for the given user.");
    map.set("USER_NOT_EXIST","Invalid environment or email, such user doesn't exist.");

    define('MESSAGE_MAP', map);
