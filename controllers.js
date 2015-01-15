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