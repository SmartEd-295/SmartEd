'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('AdminDashboardCtrl', ['$scope', 'AdminService', 'AlertService', 'UtilityService',

  function ($scope, AdminService, AlertService, UtilityService) {

    var loadData = function () {
      AdminService.getStudentDetailedInfo().success(function (result, status) {
        displayChart(result);
      }).error(function (data, status) {
        console.log("Fail");
      });
    };

    loadData();

    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };

    var displayChart = function (result) {
      var colors = UtilityService.getColors(),
        innerData = [],
        outerData = [],
        i,
        j,
        innerLen = result.length,
        outerLen,
        brightness;

      for (i = 0; i < innerLen; i += 1) {
        var innerObj = result[i];
        outerLen = innerObj.data.length;
        var tempSum = 0;

        for (j = 0; j < outerLen; j += 1) {
          var outerObj = innerObj.data[j];
          var detailedValue = outerObj.value;
          tempSum += detailedValue;
          brightness = 0.2 - (j / outerLen) / 5;

          outerData.push({
            name: outerObj.name + " (" + outerObj.alias + ")",
            y: detailedValue,
            color: Highcharts.Color(colors[i]).brighten(brightness).get()
          });
        }

        innerData.push({
          name: innerObj.type.capitalize(),
          y: tempSum,
          color: colors[i]
        });
      }

      var title = 'Student Distribution Matrix (Year: 2010 - 2016)';
      var subTitle = 'Category: # of Students';
      var innerSeriesName = 'Category';
      var outerSeriesName = 'Details';
      var containerId = 'adminDashboardContainer';

      UtilityService.draw3dDonutChart(containerId, title, subTitle, innerSeriesName, outerSeriesName, innerData, outerData);
    };
  }]);
