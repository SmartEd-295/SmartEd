'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('StatsCtrl', ['$scope', '$state', '$uibModal',

  function ($scope, $state, Modal) {
    var adminScreenChart = function () {
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
    };


    var studentPerformanceScreenCharts = function (actionState) {
      $state.go(actionState);
    };


    $scope.viewDetails = function (action) {
      if (action === undefined || action == "") {
        adminScreenChart();
      } else {
        studentPerformanceScreenCharts(action);
      }
    }
  }]);

myApp.controller('StudentDataCtrl', ['$scope', '$uibModalInstance', 'AdminService', 'AlertService', 'UtilityService', 'category', 'displayName',
  function ($scope, modal, AdminService, AlertService, UtilityService, category, displayName) {
    $scope.display = displayName;

    var displayChart = function (result) {
      var data = [];
      var colors = UtilityService.getColors();
      var brightness;
      var dataLength = result.data.length;

      for (var j = 0; j < dataLength; j += 1) {
        var obj = result.data[j];
        brightness = 0.2 - (j / dataLength) / 5;
        var colorIndex = (j == 1 ? 9 : j);
        if (j == 0) {
          data.push({
            name: obj.name + " (" + obj.alias + ")",
            y: obj.value,
            color: Highcharts.Color(colors[colorIndex]).brighten(brightness).get(),
            sliced: true,
            selected: true
          });
        } else {
          data.push({
            name: obj.name + " (" + obj.alias + ")",
            y: obj.value,
            color: Highcharts.Color(colors[colorIndex]).brighten(brightness).get()
          });
        }
      }

      //$scope.chartTitle = "Student " + displayName + " Details";
      //$scope.chartSubtitle = "Term: " + $scope.term + " " + $scope.year;
      //$scope.chartData = data;

      var title = "Student " + displayName + " Details",
        subTitle = "Term: " + $scope.term + " " + $scope.year,
        seriesName = displayName,
        containerId = "studentDataContainer";

      UtilityService.draw3dPieChart(containerId, title, subTitle, seriesName, data);
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

    $scope.getStudentDetails = function () {
      fetchDetails();
    };

    $scope.cancel = function () {
      modal.dismiss('cancel');
    };
  }]);
