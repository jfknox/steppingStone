var steppingStoneControllers = angular.module('steppingStoneControllers');


steppingStoneControllers.controller('usersController', ['$scope', '$routeParams', '$cookies', 'commentFactory', 'resumeFactory',
  function($scope, $routeParams, $cookies, $commentFactory, $resumeFactory) {
	console.log('user list controller')
	
	$scope.userId = $cookies.userId;


	$resumeFactory.getAllResumes($scope.userId).
		success(function (resumes) {
			$scope.resumes = resumes

		}).
		error(function() {
			console.log("show error")
		})


	$commentFactory.getAllComments($scope.userId, false).
		success(function (comments) {
			$scope.comments = comments

		}).
		error(function() {
			console.log("comment show error")
		})

	

		
  }]);