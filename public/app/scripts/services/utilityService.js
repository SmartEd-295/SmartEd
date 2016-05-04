'use strict';

var myApp = angular.module('smartedApp');

myApp.service('UtilityService', ['$rootScope', 'ngNotify', function ($rootScope, ngNotify) {
  var service = {};

  service.draw3dPieChart = function(containerId, title, subTitle, seriesName, data){
    $('#'+containerId).highcharts({
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
        text:subTitle
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

  service.draw3dDonutChart = function(containerId, title, subTitle, innerSeriesName, outerSeriesName, innerData, outerData){
    $('#'+containerId).highcharts({
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

  service.getColors = function(){
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

  return service;

}]);
