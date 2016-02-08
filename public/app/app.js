﻿(function () {
    'use strict';

    var app =  angular.module('myApp', ['ngRoute', 'ngCookies', 'angularModalService', 'ngTable', 'ui.bootstrap', 'ui.select', 'ngSanitize', 'angular-spinkit','ngPrettyJson']);

    app.config(function ($routeProvider) {

        $routeProvider
            
            .when('/login', {
                controller: 'LoginController',
                templateUrl: '/app/views/userManagement/login.html'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: '/app/views/userManagement/register.html'
            })

            .otherwise({ redirectTo: '/login' });
    });

//  Keep User Logged in on different navigations.
    app.run(['$rootScope', '$location', '$cookieStore', '$interval', function run($rootScope, $location, $cookieStore, $interval) {
        $rootScope.globals = $cookieStore.get('globals') || {};

          var lastDigestRun = Date.now();
          var idleCheck = $interval(function() {
              var now = Date.now();
              if (now - lastDigestRun > 20*60*1000) {
                  $rootScope.globals = {};
                  $cookieStore.remove('globals');
              }
          }, 60*1000);

          $rootScope.$on('$routeChangeStart', function() {
              lastDigestRun = Date.now();
          });

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
//          Redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });


    }]);

 })();
