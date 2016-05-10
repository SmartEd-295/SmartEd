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
        url: '/login',
        templateUrl: 'views/userManagement/login.html',
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
        url: '/signUp',
        templateUrl: 'views/userManagement/register.html',
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
                  'scripts/controllers/dashboard/headerController.js',
                  'scripts/controllers/dashboard/statsController.js',
                  'scripts/controllers/student/assignmentController.js',
                  'scripts/directives/header-bar/header-bar.js',
                  'scripts/directives/header-notification/header-notification.js',
                  'scripts/directives/tableau-chart/tableau-chart.js',
                  'scripts/directives/sidebar/sidebar.js',
                  'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                  'scripts/directives/stats/stats.js',
                  'scripts/directives/charts/dashboardCharts.js'
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
        controller: 'ProfessorDashboardCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'smartedApp',
                files: [
                  'scripts/controllers/dashboard/dashboardController.js',
                  'scripts/directives/notifications/notifications.js',
                  'scripts/directives/chat/chat.js',
                  'styles/profile.css'
                ]
              })
          }
        }
      })
      /* Student States  */
      .state('dashboard.student', {
        templateUrl: 'views/dashboard/student.html',
        controller: 'StudentDashboardCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'smartedApp',
                files: [
                  'scripts/controllers/dashboard/dashboardController.js',
                  'scripts/directives/notifications/notifications.js',
                  'scripts/directives/chat/chat.js',
                  'styles/profile.css'
                ]
              })
          }
        }
      })

      /* Admin State */
      .state('dashboard.admin', {
        templateUrl: 'views/dashboard/admin.html',
        controller: 'AdminDashboardCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'smartedApp',
                files: [
                  'scripts/controllers/admin/adminDashboardController.js',
                  'scripts/directives/notifications/notifications.js',
                  'scripts/directives/chat/chat.js'
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

      .state('dashboard.courseGradeDetails', {
        templateUrl: 'views/admin/gradesByCourse.html'
      })

      .state('dashboard.adminAverageQuiz', {
        templateUrl: 'views/admin/averageQuizScoreAdmin.html'
      })

      .state('dashboard.adminDetailedQuiz', {
        templateUrl: 'views/admin/detailedQuizPerformanceAdmin.html'
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
        templateUrl: 'views/professor/courseDetails.html',
        url: '/course/:courseId/:term/:year',
        controller: 'ChartCtrl',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/professor/courseDetailController.js'
              ]
            })
          }
        }
      })
      .state('dashboard.studentRecommendations', {
        templateUrl: 'views/student/courseRecommendations.html',
        url: '/student/recommendations',
        controller: 'StudentCtrl',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/student/studentController.js'
              ]
            }),
              $ocLazyLoad.load(
                {
                  name: 'ngTable',
                  files: ['bower_components/ng-table/dist/ng-table.min.js']
                })
          }
        }
      })
      .state('dashboard.studentCoursePerformance', {
        templateUrl: 'views/student/studentCoursePerformance.html',
        url: '/studentCoursePerformance/:course',
        controller: 'StudentCoursePerformanceMainCtrl',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/student/studentController.js',
                'scripts/directives/charts/dashboardCharts.js'
              ]
            }),
              $ocLazyLoad.load(
                {
                  name: 'ngTable',
                  files: ['bower_components/ng-table/dist/ng-table.min.js']
                })
          }
        }
      })
      .state('dashboard.assignments', {
        templateUrl: 'views/student/studentAssignmentPerformance.html',
        url: '/course/assignments',
        controller: 'StudentAssignmentPerformanceCtrl'
      })
      .state('dashboard.quizzes', {
        templateUrl: 'views/student/studentQuizPerformance.html',
        controller: 'StudentQuizPerformanceCtrl',
        url: '/course/quizzes',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/student/quizController.js',
                'scripts/directives/charts/dashboardCharts.js'
              ]
            }),
              $ocLazyLoad.load(
                {
                  name: 'ngTable',
                  files: ['bower_components/ng-table/dist/ng-table.min.js']
                })
          }
        }
      })
      .state('dashboard.grades', {
        templateUrl: 'views/student/studentGradesPerformance.html',
        controller: 'StudentGradesPerformanceCtrl',
        url: '/course/grades',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/student/gradesController.js',
                'scripts/directives/charts/dashboardCharts.js'
              ]
            })
          }
        }
      })
      .state('dashboard.files', {
        templateUrl: 'views/files/courseFiles.html',
        controller: 'FilesCtrl',
        url: '/course/files',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/files/filesController.js'
              ]
            })
          }
        }
      })
      .state('dashboard.submissions', {
        templateUrl: 'views/student/studentSubmissionPerformance.html',
        controller: 'StudentSubmissionPerformanceCtrl',
        url: '/course/submissions',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/student/submissionController.js',
                'scripts/directives/charts/dashboardCharts.js'
              ]
            })
          }
        }
      })
      .state('dashboard.userProfile', {
        templateUrl: 'views/userManagement/userProfile.html',
        controller: 'UserProfileCtrl',
        url: '/user/profile',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'smartedApp',
              files: [
                'scripts/controllers/userManagement/userProfileController.js',
                'styles/profile.css'
              ]
            })
          }
        }
      });
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


