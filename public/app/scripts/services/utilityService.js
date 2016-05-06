'use strict';

var myApp = angular.module('smartedApp');

myApp.service('UtilityService', ['$rootScope', 'ngNotify', function ($rootScope, ngNotify) {
  var service = {};

  service.draw3dPieChart = function (containerId, title, subTitle, seriesName, data) {
    $('#' + containerId).highcharts({
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 55,
          beta: 0
        }
      },
      title: {
        text: title
      },
      subtitle: {
        text: subTitle
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
        name: seriesName,
        data: data
      }]
    });
  };

  service.draw3dDonutChart = function (containerId, title, subTitle, innerSeriesName, outerSeriesName, innerData, outerData) {
    $('#' + containerId).highcharts({
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 50
        }
      },
      title: {
        text: title
      },
      subtitle: {
        text: subTitle
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 25
        }
      },
      series: [{
        name: innerSeriesName,
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
        name: outerSeriesName,
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
  };

  service.draw3dBarChart = function (containerId, title, subTitle, seriesName1, data1, seriesName2, data2 ) {
    $('#' + containerId).highcharts({
      chart: {
        type: 'column',
        margin: 75,
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50
        }
      },
      plotOptions: {
        column: {
          depth: 25
        }
      },
      title: {
        text: title
      },
      subtitle: {
        text: subTitle
      },
      series: [{
        name: seriesName1,
        data: data1,
        stack: 0
      },{
        name: seriesName2,
        data: data2,
        stack: 1
      }]
    });
  };

  service.getColors = function () {
    return Highcharts.map(Highcharts.getOptions().colors, function (color) {
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
    })
  };

  service.drawAssignmentTimeline = function(containerId, title, subTitle, categoriesArray, yAxisLabel, seriesName, data) {
    $('#'+containerId).highcharts({
      chart: {
        type: 'columnrange',
        inverted: true
      },

      title: {
        text: title
      },

      subtitle: {
        text: subTitle
      },

      xAxis: {
        categories: categoriesArray
      },

      yAxis: {
        title: {
          text: yAxisLabel
        },
        type: 'datetime'
      },

      tooltip: {

      },

      plotOptions: {
        columnrange: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return new Date(this.y).toDateString();
            },
            y: 0
          }
        }
      },

      legend: {
        enabled: false
      },

      series: [{
        name: seriesName,
        data: data
      }]

    });
  };

  return service;

}]);
