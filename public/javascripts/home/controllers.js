var steppingStoneControllers = angular.module('steppingStoneControllers', ['ngCookies','ngModal']);

steppingStoneControllers.controller('HomeController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
  	console.log('home controller')
}]);
