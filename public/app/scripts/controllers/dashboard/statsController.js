'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('StatsCtrl', ['$scope', '$state', 'UserService', 'CourseService', 'AdminService', '$uibModal',

  function ($scope, $state, UserService, CourseService, AdminService, Modal) {


    $scope.viewDetails = function () {
      var modalInstance = Modal.open({
        templateUrl: 'views/admin/studentInformation.html',
        controller: 'StudentDataCtrl',
        resolve: {
          category: function () {
            return $scope.category;
          },
          displayName: function () {
            return $scope.comments;
          }
        }
      });

      modalInstance.result.then(function () {
      });
    }
  }]);

myApp.controller('StudentDataCtrl', ['$scope', '$uibModalInstance', 'AdminService', 'AlertService', 'category', 'displayName',
  function ($scope, modal, AdminService, AlertService, category, displayName) {
    $scope.display = displayName;

    var displayChart = function (result) {

      var colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
          return {
            radialGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7
            },
            stops: [
              [0, color],
              [1, Highcharts.Color(color).brighten(-0.3).get('rgb')]
            ]
          };
        }),
        data = [],
        j,
        dataLength, brightness;
      dataLength = result.data.length;
      for (j = 0; j < dataLength; j += 1) {

        var obj = result.data[j];
        brightness = 0.2 - (j / dataLength) / 5;

        data.push({
          name: obj.name + " (" + obj.alias + ")",
          y: obj.value,
          color: Highcharts.Color(colors[j]).brighten(brightness).get()
        });
      }

      $('#studentDataContainer').highcharts({
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 55,
            beta: 0
          }
        },
        title: {
          text: "Student " + displayName + " Details"
        },
        subtitle: {
          text: "Term: " + $scope.term + " " + $scope.year
        },
        tooltip: {
          pointFormat: '<b>{point.y}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }
        },
        series: [{
          type: 'pie',
          name: displayName,
          data: data
        }]
      });
    };

    var fetchDetails = function () {
      AdminService.getStudentInfoPerTerm(category, $scope.term, $scope.year).success(function (result, status) {
        displayChart(result);
      }).error(function (data, status) {
        AlertService.displayBoxMessage(data, 'studentDetailContainer', 'error');
      });
    };

    var loadData = function () {
      $scope.yearList = [2010, 2011, 2012, 2013, 2014, 2015];
      $scope.termList = ['Spring', 'Summer', 'Fall'];
      $scope.term = "Fall";
      $scope.year = 2015;

      fetchDetails();
    };
    loadData();


    $scope.getStudentDetails = function(){
      fetchDetails();
    };

    $scope.cancel = function () {
      modal.dismiss('cancel');
    };


  }]);
