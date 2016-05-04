  'use strict';


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
    template: '<div style="height: 400px"></div>',
    scope: {
      title: '=',
      subtitle: '=',
      data: '='
    },
    link: function (scope, element, attrs) {
      var chart = new Highcharts.chart(element[0], {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 50,
            beta: 0
          }
        },
        title: {
          text: scope.title
        },
        subtitle: {
          text: scope.subtitle
        },
        tooltip: {
          pointFormat: '<b>{point.y}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y}'
            }
          }
        },
        series: [{
          data: scope.data
        }]
      });

      scope.$watch("data", function (newValue) {
        chart.series[0].setData(newValue, true);
      }, true);

      scope.$watch("title", function (newValue) {
        chart.setTitle({text:newValue});
      }, true);

      scope.$watch("subtitle", function (newValue) {
        chart.setTitle(null,{text:newValue});
      }, true);
    }
  };
});
