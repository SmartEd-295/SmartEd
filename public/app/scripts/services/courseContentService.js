'use strict';

var myApp = angular.module('smartedApp');

myApp.service('CourseContentService', ['$http', function ($http) {

  this.addCourseContent = function (courseId, data) {
    return $http.post('/content/addContent/'+ courseId, data);
  };
}]);
