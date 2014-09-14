var steppingStoneControllers = angular.module('steppingStoneControllers');


steppingStoneControllers.controller('usersController', ['$scope', '$routeParams', 'userFactory',
  function($scope, $routeParams, $userFactory) {
	console.log('user list controller')
	$userFactory.getAllUsers().
	success(function (users) {
		$scope.users = users

	}).
	error(function() {
		console.log("show error")
	})
  }]);