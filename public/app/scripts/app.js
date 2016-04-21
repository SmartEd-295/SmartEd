(function () {
  'use strict';

  var app = angular.module('smartedApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar', 'ngCookies'
  ]);

  app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
    });

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home',{
        url:'/home',
        templateUrl:'views/home.html'
      })
      .state('login', {
        controller: 'LoginCtrl',
        templateUrl: 'views/userManagement/login.html',
        url: '/login',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/userManagement/loginController.js'
              ]
            })
          }
        }
      })
      .state('signUp', {
        controller: 'RegisterCtrl',
        templateUrl: 'views/userManagement/register.html',
        url: '/signUp',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'smartedApp',
                files: ['scripts/controllers/userManagement/registerController.js', 'scripts/directives/appDirective.js']
              })
          }
        }
      })
      .state('reset', {
        controller: 'ResetCtrl',
        templateUrl: 'views/userManagement/resetPassword.html',
        url: '/reset',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: ['scripts/directives/appDirective.js', 'scripts/controllers/userManagement/resetPasswordController.js']
            })
          }
        }
      })
      /* Generic dashboard wrapper */
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/wrapper.html',
        controller: 'DashboardCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad){
            return $ocLazyLoad.load(
              {
                name: 'smartedApp',
                files: [
             	    'scripts/controllers/dashboard/dashboard.js',
                  'scripts/controllers/dashboard/sidebarController.js',
                  'scripts/directives/header/header.js',
                  'scripts/directives/header-notification/header-notification.js',
                  'scripts/directives/sidebar/sidebar.js',
                  'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                ]
              }),
              $ocLazyLoad.load(
                {
                  name: 'toggle-switch',
                  files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                    "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                  ]
                }),
              $ocLazyLoad.load(
                {
                  name: 'ngAnimate',
                  files: ['bower_components/angular-animate/angular-animate.js']
                }),
              $ocLazyLoad.load(
                {
                  name: 'ngCookies',
                  files: ['bower_components/angular-cookies/angular-cookies.js']
                }),
              $ocLazyLoad.load(
                {
                  name: 'ngResource',
                  files: ['bower_components/angular-resource/angular-resource.js']
                }),
              $ocLazyLoad.load(
                {
                  name: 'ngSanitize',
                  files: ['bower_components/angular-sanitize/angular-sanitize.js']
                }),
              $ocLazyLoad.load(
                {
                  name: 'ngTouch',
                  files: ['bower_components/angular-touch/angular-touch.js']
                })
          }
        }
      })
      /* Professor States  */
      .state('dashboard.professor', {
        url:'',
        templateUrl: 'views/dashboard/professor.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'smartedApp',
                    files:[
                    'scripts/directives/notifications/notifications.js',
                    'scripts/directives/chat/chat.js',
                    'scripts/directives/dashboard/stats/stats.js'
                    ]
                })
            }
        }
    })
      /* Student States  */
      .state('dashboard.student', {
        url:'',
        templateUrl: 'views/dashboard/student.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad){
            return $ocLazyLoad.load(
              {
                name:'smartedApp',
                files:[
                  'scripts/directives/notifications/notifications.js',
                  'scripts/directives/chat/chat.js',
                  'scripts/directives/dashboard/stats/stats.js'
                ]
              })
          }
        }
      })

      /* Admin State */
      .state('dashboard.admin', {
        url:'',
        templateUrl: 'views/dashboard/admin.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad){
            return $ocLazyLoad.load(
              {
                name:'smartedApp',
                files:[
                  'scripts/directives/notifications/notifications.js',
                  'scripts/directives/chat/chat.js',
                  'scripts/directives/dashboard/stats/stats.js'
                ]
              })
          }
        }
      })

    .state('course.students',{
      templateUrl:'views/form.html',
      url:'/form'
    })
    .state('course.assignments',{
      templateUrl:'views/pages/blank.html',
      url:'/blank'
    })
    .state('course.quizzes',{
      templateUrl:'views/table.html',
      url:'/table'
    })
    .state('course.grades.upload',{
      templateUrl:'views/ui-elements/panels-wells.html',
      url:'/panels-wells'
    })
    .state('course.files.all',{
      templateUrl:'views/ui-elements/buttons.html',
      url:'/buttons'
    })
    .state('course.announcements.all',{
      templateUrl:'views/ui-elements/notifications.html',
      url:'/notifications'
    })
    .state('professor.performance',{
      templateUrl:'views/ui-elements/typography.html',
      url:'/typography'
    })
    .state('professor.statistics',{
      templateUrl:'views/ui-elements/icons.html',
      url:'/icons'
    })
    .state('professor.collaboration',{
      templateUrl:'views/ui-elements/grid.html',
      url:'/grid'
    })
    .state('dashboard.charts',{
      templateUrl:'views/chart.html',
      url:'/chart',
      controller:'ChartCtrl',
      resolve: {
        loadMyFile:function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name:'chart.js',
            files:[
              'bower_components/angular-chart.js/dist/angular-chart.min.js',
              'bower_components/angular-chart.js/dist/angular-chart.css'
            ]
          }),
          $ocLazyLoad.load({
              name:'smartedApp',
              files:['scripts/controllers/chartContoller.js']
          })
        }
      }
    })
  }]);

  //  Keep User Logged in on different navigations.
  app.run(['$rootScope', '$location', '$cookieStore', '$interval', function run($rootScope, $location, $cookieStore, $interval) {
    $rootScope.globals = $cookieStore.get('globals') || {};

    var lastDigestRun = Date.now();
    var idleCheck = $interval(function () {
      var now = Date.now();
      if (now - lastDigestRun > 20 * 60 * 1000) {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
      }
    }, 60 * 1000);

    $rootScope.$on('$routeChangeStart', function () {
      lastDigestRun = Date.now();
    });
    /*

     $rootScope.$on('$locationChangeStart', function (event, next, current) {
     //          Redirect to login page if not logged in and trying to access a restricted page
     var restrictedPage = $.inArray($location.path(), ['/login', '/signUp']) === -1;
     var loggedIn = $rootScope.globals.currentUser;
     if (restrictedPage && !loggedIn) {
     $location.path('/home');
     }
     });
     */


  }]);

})();


