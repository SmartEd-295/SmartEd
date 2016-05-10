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

    map.set('USER_REGISTERED','Student is already registered. Please try to login.');
    map.set('USER_NEEDS_VERIFICATION','Student is registered. Check your mail to activate account.');

    map.set('REGISTER_INVALID_EMAIL','You can only use SJSU email to register.');

    map.set('REGISTER_FAILED','Registration Failed, please try again!');
    map.set('REGISTER_SUCCESS','Registration Successful, log in using credentials!');

    map.set('PROFESSOR_REGISTERED','Professor is already added. Try to assign subjects.');
    map.set('PROFESSOR_REGISTER_FAILED','Some error occurred in adding professor, please try again!');
    map.set('PROFESSOR_REGISTER_SUCCESS','Professor added, ask to check the mail.');

    map.set('LOGIN_FAILED_WRONG_PASSWORD', 'Invalid password for this user email, please try again!.');
    map.set('LOGIN_FAILED_ACCOUNT_NOT_ACTIVATED', 'Account is not yet activated, check your mail for activation.');
    map.set('USER_NOT_EXIST','Invalid email, such user does not exist.');

    map.set('PASSWORD_RESET_FAILED','Error occurred in password reset, please try again!');
    map.set('PASSWORD_RESET_SENT','Please check your mail for temporary password.');
    map.set('PASSWORD_RESET_SUCCESS','Password reset successfully, login with new credentials.');


    map.set('GET_ALL_PROFESSOR_FAILED','Some error occurred in fetching professor details, please try again later!');

    map.set('GET_SINGLE_PROF_COURSES_FAILED','Some error occurred in fetching professor course details, please try again later!');
    map.set('IS_VALID_USER','is valid user');
    map.set('MESSAGE_NOT_SENT', 'Some error occured while sending message .. please try again !!');
    map.set('MESSAGE_SENT_SUCCESS','Message sent successfully.');
    map.set('ERROR_NO_MESSAGE_FOUND','Some error occured while fetching message .. please try again !!');
    map.set('NO_MESSAGES_FOUND','No Messages found!!');
    map.set('NO_SENT_MESSAGES_FOUND','No Messages Sent!!');


    map.set('COURSE_PRESENT','Course is already assigned to the professor, please check the status!');
    map.set('COURSE_ASSIGN_ERROR','Some error occurred, please try again later!');
    map.set('STATUS_CHANGE_ERROR','Some error occurred in changing the status, please try again later!');


    map.set('GET_RECOMMENDED_COURSES_FAILED','Sorry, Not able to find any recommendation at this moment!');

    map.set('GET_STUDENT_VISUALIZATION_FAILED','Some error occured in fetching student details, please try again!');
    map.set('GET_STUDENT_VISUALIZATION_PER_TERM_FAILED','There are no details available for this term, please try a different one!');



    //  -------------------------------------------------- CANVAS  -------------------------------------------------------------

    map.set('CANVAS_GET_COURSE_LIST', '/api/v1/courses');
    map.set('CANVAS_GET_ASSIGNMENT_LIST', '/api/v1/courses/:course_id/assignments?include=submission');
    map.set('CANVAS_GET_QUIZ_LIST', '/api/v1/courses/:course_id/quizzes');
    map.set('CANVAS_GET_MISSING_SUBMISSIONS', '/api/v1/users/:user_id/missing_submissions');
    map.set('CANVAS_GET_USER_TODO_LIST', '/api/v1/users/self/todo');
    map.set('CANVAS_GET_USER_ACTIVITY_STREAM', '/api/v1/users/self/activity_stream/summary');
    map.set('CANVAS_GET_USER_PROFILE', '/api/v1/users/:user_id/profile');

    map.set('CANVAS_CONNECTION_FAILED', 'Canvas Connection Error !!');
    map.set('PROFILE_UPDATE_FAILED', 'Update Profile Error. Please try again !!');
    map.set('PROFILE_UPDATE_SUCCESS', 'Update Profile Successful !!');


    //  -------------------------------------------------- ROLES -------------------------------------------------------------------------

    map.set('STUDENT_ROLE', 'Student');
    map.set('PROFESSOR_ROLE', 'Professor');
    map.set('ADMIN_ROLE', 'Admin');

    map.set('DOMAIN', 'sjsu.edu');

    //  ---------------------------------------------------------------------------------------------------------------------------------


    define('MESSAGE_MAP', map);
