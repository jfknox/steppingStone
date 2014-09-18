var steppingStoneControllers = angular.module('steppingStoneControllers');


steppingStoneControllers.controller('usersController', ['$scope', '$routeParams', '$cookies', 'commentFactory', 'resumeFactory', 'userFactory', 'linkedinFactory', 
  function($scope, $routeParams, $cookies, $commentFactory, $resumeFactory, $userFactory, $linkedinFactory) {
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

	$userFactory.getUser($scope.userId).
		success(function (users) {
			$scope.linkedInUrl = users.linkedInUrl
			$linkedinFactory.refreshLinkedin()
			console.log(users.linkedInUrl)
		}).
		error(function() {
			console.log("show error")
		})

		
  }]);