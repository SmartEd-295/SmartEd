'use strict';

var myApp = angular.module('smartedApp');

myApp.controller('AdminDashboardCtrl', ['$scope', 'AdminService', 'AlertService',

  function ($scope, AdminService, AlertService) {

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
    }

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
              [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
          };
        }),

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

      $('#container').highcharts({
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 50
          }
        },
        title: {
          text: 'Student Distribution Matrix (Year: 2010 - 2016)'
        },
        subtitle: {
          text: 'Category: # of Students'
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 25
          }
        },
        series: [{
          name: 'Category',
          data: innerData,
          size: '40%',
          dataLabels: {
            formatter: function () {
              return this.point.name;
            },
            color: '#000',
            distance: -3
          }
        }, {
          name: 'Details',
          data: outerData,
          size: '100%',
          innerSize: '60%',
          dataLabels: {
            formatter: function () {
              return '<b>' + this.point.name + ':</b> ' + this.y;
            },
            distance: 30
          }
        }]
      });
    }
  }]);
