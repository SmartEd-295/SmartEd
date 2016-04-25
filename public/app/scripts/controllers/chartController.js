'use strict';
/**
 * @ngdoc function
 * @name smartedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartedApp
 */
angular.module('smartedApp')
  .controller('ChartCtrl', ['$scope', '$stateParams', 'CourseService', function ($scope, $stateParams, CourseService) {
    $scope.line = {
	    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	    series: ['Series A', 'Series B'],
	    data: [
	      [65, 59, 80, 81, 56, 55, 40],
	      [28, 48, 40, 19, 86, 27, 90]
	    ],
	    onClick: function (points, evt) {
	      console.log(points, evt);
	    }
    };

    $scope.bar = {
	    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
		series: ['Series A', 'Series B'],

		data: [
		   [65, 59, 80, 81, 56, 55, 40],
		   [28, 48, 40, 19, 86, 27, 90]
		]

    };

    $scope.donut = {
    	labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
    	data: [300, 500, 100]
    };

    $scope.radar = {
    	labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],

    	data:[
    	    [65, 59, 90, 81, 56, 55, 40],
    	    [28, 48, 40, 19, 96, 27, 100]
    	]
    };

    $scope.pie = {
    	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
    	data : [300, 500, 100]
    };

    $scope.polar = {
    	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
    	data : [300, 500, 100, 40, 120]
    };

    $scope.dynamic = {
    	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
    	data : [300, 500, 100, 40, 120],
    	type : 'PolarArea',

    	toggle : function ()
    	{
    		this.type = this.type === 'PolarArea' ?
    	    'Pie' : 'PolarArea';
		}
    };


    // Sample options for first chart
    $scope.chartOptions = {
      title: {
        text: 'Temperature data'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },

      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }]
    };

    // Sample data for pie chart
    $scope.pieData = [{
      name: "Microsoft Internet Explorer",
      y: 56.33
    }, {
      name: "Chrome",
      y: 24.03,
      sliced: true,
      selected: true
    }, {
      name: "Firefox",
      y: 10.38
    }, {
      name: "Safari",
      y: 4.77
    }, {
      name: "Opera",
      y: 0.91
    }, {
      name: "Proprietary or Undetectable",
      y: 0.2
    }];


    $scope.hc3dPieData = [
      ['Excellent', 8],
      ['Very Good', 3],
      ['Good', 3],
      ['Average', 1],
      ['Fair', 6],
      ['Bad', 8]
    ];

    // load course data
    var courseId = $stateParams.courseId;
    console.log('---------------> '+courseId);
    CourseService.getCourseDetails(courseId).success(function (data, status) {
      console.log(' SUCCESS : ' + JSON.stringify(data)) ;
      $scope.currentCourseData = data;
    }).error(function (data, status) {
      console.log(data) ;
    });

}]);
