var steppingStoneControllers = angular.module('steppingStoneControllers', ['ngCookies']);

steppingStoneControllers.controller('HomeController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
  	console.log('home controller')
}]);
