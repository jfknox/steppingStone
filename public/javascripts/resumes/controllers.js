var steppingStoneControllers = angular.module('steppingStoneControllers', []);


steppingStoneControllers.controller('ResumeListController', ['$scope', '$routeParams', 'resumeFactory',
  	function($scope, $routeParams, $resumeFactory) {
		console.log('resume list controller')

		$resumeFactory.showAllResumes().
			success(function (resumes) {
				$scope.resumes = resumes

			}).
			error(function() {
				console.log("show error")
			})
	

	$scope.newResume = function() {
		var industry = $scope.industry
		var description = $scope.description
		var resumeText = $scope.resumeText

		$resumeFactory.newResume(industry, description, resumeText).
			success(function (newResume) {
				console.log("new Success");
				$scope.resumes.push(newResume);
			}).
			error(function() {
				console.log("new error")
			})		
		}
}]);



steppingStoneControllers.controller('resumeShowController', ['$scope', '$routeParams', 'resumeFactory',
  function($scope, $routeParams, $resumeFactory) {
	console.log('resume show controller')
		$resumeFactory.showResume($routeParams.id).
			success(function (resume) {
				$scope.resume = resume

			}).
			error(function() {
				console.log("show error")
			})
		}
]);

