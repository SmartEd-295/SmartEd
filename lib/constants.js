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

    map.set("USER_REGISTERED","Student is already registered. Please try to login.");
    map.set("USER_NEEDS_VERIFICATION","Student is registered. Check your mail to activate account.");
    map.set("REGISTER_INVALID_EMAIL","You can only use SJSU email to register.");
    map.set("REGISTER_FAILED","Registration Failed, please try again!");
    map.set("REGISTER_SUCCESS","Registration Successful, log in using credentials!");

    map.set("LOGIN_FAILED", "Invalid password or account is not yet activated.");
    map.set("USER_NOT_EXIST","Invalid email, such user doesn't exist.");


    //  -------------------------------------------------- ROLES -------------------------------------------------------------

    map.set("STUDENT_ROLE", "Student");
    map.set("PROFESSOR_ROLE", "Professor");
    map.set("ADMIN_ROLE", "Admin");

    map.set("DOMAIN", "sjsu.edu");

    define('MESSAGE_MAP', map);
