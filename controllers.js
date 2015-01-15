'use strict';

/**
 * App module
 * @type {object}
 */
var app = angular.module('gdrive-notify', ['ngRoute']);

/**
 * Game Service
 */
app.factory('App', ['$rootScope', '$http', '$timeout', '$location',
  function($rootScope, $http, $timeout, $location) {
    return new App($rootScope, $http, $timeout, $location);
  }
]);

/**
 * Routes logic
 */
app.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
  when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  }).
  when('/add', {
    templateUrl: 'partials/add.html',
    controller: 'AddCtrl'
  }).
  when('/key', {
    templateUrl: 'partials/key.html',
    controller: 'KeyCtrl'
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);

app.filter('moment', function() {
  return function(date) {
    var txt = '';
    var time = Math.floor(new Date(date).getTime() / 1000);
    var now = Math.floor(_.now() / 1000);

    var ago = now - time;
    if (ago < 60) return Math.floor(ago) + 's'

    ago /= 60;
    if (ago < 60) return Math.floor(ago) + 'm';

    ago /= 60;
    if (ago < 24) return Math.floor(ago) + 'h';

    ago /= 24;
    if (ago < 30) return Math.floor(ago) + 'months';

    ago /= 365;
    return ago + 'years';
  };
});

/**
 * INDEX
 */

app.controller('IndexCtrl', function($scope, $location, $http, App) {

  $scope.isActive = function(route) {
    return route === $location.path();
  };

  $scope.goHome = function() {
    $location.path('/home');
  };

  $scope.goAdd = function() {
    $location.path('/add');
  };

  $scope.goKey = function() {
    $location.path('/key');
  };

});

/**
 * /Home
 */

app.controller('HomeCtrl', function($rootScope, App) {



});

/**
 * /Add
 */

app.controller('AddCtrl', function($rootScope, App) {



});

/**
 * /Key
 */

app.controller('KeyCtrl', function($rootScope, App) {



});