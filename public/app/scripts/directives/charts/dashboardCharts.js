'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('smartedApp')
  .directive('hcPieChart', function () {
    return {
      restrict: 'E',
      template: '<div></div>',
      scope: {
        title: '@',
        data: '='
      },
      link: function (scope, element) {
        Highcharts.chart(element[0], {
          chart: {
            type: 'pie'
          },
          title: {
            text: scope.title
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
          },
          series: [{
            data: scope.data
          }]
        });
      }
    };
  })
  .directive('hc3dPieChart', function () {
  return {
    restrict: 'E',
    template: '<div></div>',
    scope: {
      title: '@',
      data: '='
    },
    link: function (scope, element) {
      Highcharts.chart(element[0], {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: scope.title
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45,
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          data: scope.data
        }]
      });
    }
  };
});


