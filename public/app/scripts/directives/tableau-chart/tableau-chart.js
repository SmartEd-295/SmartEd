/* Using this directive is as easy as 1, 2, 3.
 1. Grab the Tableau API JavaScript library as well as this module.
 a. <script src="path/to/tableau-2.0.0.min.js"></script>
 b. <script src="path/to/angular-tableau.js"></script>
 2. Import the module into your app by adding 'angular-tableau' to your dependencies.
 3. Use the directive like this:
 <tableau-viz height="'500px'"
 url="path/to/tableau-dashboard"
 filters={'field1':['item1', 'item2'], 'dateField':{'min':startDate, 'max':endDate}}">
 </tableau-viz>
 a. You can add 'cover' to the directive to prevent the user from interacting with the dashboard.
 b. You can add 'showTabs' and 'showToolbar' to show tabs or the toolbar (hidden by default)
 c. Remember to add width or height, as appropriate for your layout (use the width and height
 attributes on the directive). Not sure which one you need? Try the height setting first.
 */

'use strict';

angular.module("smartedApp")
  .value('tableau', tableau)
  .directive('tableauChart', ['$q', '$interval', 'tableau', function ($q, $interval, tableau) {
    return {
      restrict: 'E',
      template: '<div></div><div style="position: absolute; top:0; height:100%; width:100%; opacity: 0;"></div>',
      scope: {
        url: '=',
        height: '=',
        width: '=',
        filters: '='
      },
      link: function (scope, element, attrs) {
        // Just some housekeeping since the browser won't know how to style this element
        element.css('display', 'block');
        element.css('position', 'relative');
        // Set target for viz
        var vizTarget = element[0].children[0];
        var viz;
        // Block user input if cover is specified
        if (!('cover' in attrs)) {
          var cover = angular.element(element[0].children[1]);
          cover.css('display', 'none');
        }
        // We need to have a URL to do anything
        if (!scope.url) {
          console.log("Error: No URL was specified for Tableau Viz");
          return;
        }
        // Create the dashboard
        function createViz() {
          viz = new tableauSoftware.Viz(vizTarget, scope.url, {
            'height': scope.height ? scope.height : '100%',
            'width': scope.width ? scope.width : '100%',
            'hideTabs': 'showTabs' in attrs ? false : true,
            'hideToolbar': 'showToolbar' in attrs ? false : true,
            'onFirstInteractive': function () {
              applyFilters();
              scope.$watch('filters', function (newValue, oldValue) {
                applyFilters();
              }, true);
            }
          });
        }

        createViz();
        // We need to rebuild the dashboard periodically to accommodate session timeouts. This is pretty hacky though. :/
        var stop = $interval(function rebuild() {
          viz.dispose();
          createViz();
        }, 300000);
        // Destroy the dashboard and interval timers upon destroying directive.
        scope.$on('$destroy', function () {
          if (viz) viz.dispose();
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        });
        // Define a function to apply filters to dashboard
        function applyFilters() {
          var dash = viz.getWorkbook().getActiveSheet();
          var filtersArr = Object.keys(scope.filters);
          for (var i = 0; i < filtersArr.length; i++) {
            var filterValue = scope.filters[filtersArr[i]];
            // If it's a dashboard, we need to filter each sheet individually.
            if (dash.getSheetType() === 'dashboard') {
              var sheets = dash.getWorksheets();
              for (var j = 0; j < sheets.length; j++) {
                applyFilterToSheet(sheets[j], filtersArr[i], filterValue)
              }
            }
            if (dash.getSheetType() === 'worksheet') {
              applyFilterToSheet(dash, filtersArr[i], filterValue)
            }
          }
        }

        // Define a function to apply filters to individual sheet
        function applyFilterToSheet(sheet, key, filter) {
          if (filter.min && filter.max) {
            // Deal with JavaScript quirk on date objects.
            var postIncrementDate = angular.copy(filter.max);
            postIncrementDate.setDate(postIncrementDate.getDate() + 1);
            sheet.applyRangeFilterAsync(key, {
              min: filter.min,
              max: postIncrementDate
            });
          }
          else {
            sheet.applyFilterAsync(key, filter, tableau.FilterUpdateType.REPLACE)
          }
        }
      }
    };
  }]);
