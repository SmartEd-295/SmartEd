(function () {
  'use strict';

  var app = angular.module('smartedApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap', 'ngNotify',
    'angular-loading-bar', 'ngCookies'
  ]);

  app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
    });

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
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
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'smartedApp',
                files: [
                  'scripts/controllers/dashboard/dashboardController.js',
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
        templateUrl: 'views/dashboard/professor.html',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'smartedApp',
                files: [
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
        templateUrl: 'views/dashboard/student.html',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'smartedApp',
                files: [
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
        templateUrl: 'views/dashboard/admin.html',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'smartedApp',
                files: [
                  'scripts/directives/notifications/notifications.js',
                  'scripts/directives/chat/chat.js',
                  'scripts/directives/dashboard/stats/stats.js'
                ]
              })
          }
        }
      })

      .state('dashboard.addProfessor', {
        templateUrl: 'views/admin/addProfessor.html',
        controller: 'AddProfessorCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: ['scripts/controllers/admin/addProfessorController.js']
            })
          }
        }
      })

      .state('dashboard.professorDetails', {
        templateUrl: 'views/admin/professorDetails.html',
        controller: 'ProfessorDetailsCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: ['scripts/controllers/admin/professorDetailsController.js']
            }),
              $ocLazyLoad.load(
                {
                  name: 'ngTable',
                  files: ['bower_components/ng-table/dist/ng-table.min.js']
                })
          }
        }
      })

      .state('course.students', {
        templateUrl: 'views/form.html',
        url: '/form'
      })
      .state('course.assignments', {
        templateUrl: 'views/pages/blank.html',
        url: '/blank'
      })
      .state('course.quizzes', {
        templateUrl: 'views/table.html',
        url: '/table'
      })
      .state('course.grades.upload', {
        templateUrl: 'views/ui-elements/panels-wells.html',
        url: '/panels-wells'
      })
      .state('course.files.all', {
        templateUrl: 'views/ui-elements/buttons.html',
        url: '/buttons'
      })
      .state('course.announcements.all', {
        templateUrl: 'views/ui-elements/notifications.html',
        url: '/notifications'
      })
      .state('professor.performance', {
        templateUrl: 'views/ui-elements/typography.html',
        url: '/typography'
      })
      .state('professor.statistics', {
        templateUrl: 'views/ui-elements/icons.html',
        url: '/icons'
      })
      .state('dashboard.collaboration', {
        templateUrl: 'views/messaging/messaging.html',
        url: '/collaborate',
        controller: 'MessagingCtrl',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/messaging/messageController.js'
              ]
            })
          }
        }
      })
      .state('dashboard.courseCharts', {
        templateUrl: 'views/course/courseDetails.html',
        url: '/course/:courseId',
        controller: 'ChartCtrl',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/course/courseDetailController.js',
                'scripts/directives/charts/dashboardCharts.js'
              ]
            })
          }
        }
      })
  }]);

  //  Keep User Logged in on different navigations.
  app.run(['$rootScope', '$location', '$cookieStore', '$interval', 'ngNotify', function run($rootScope, $location, $cookieStore, $interval, ngNotify) {
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

    ngNotify.config({
      theme: 'pitchy',
      position: 'top',
      duration: 3000,
      type: 'grimace',
      sticky: false,
      button: true,
      html: false
    });

  }]);

})();


