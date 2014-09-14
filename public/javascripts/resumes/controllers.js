var steppingStoneControllers = angular.module('steppingStoneControllers');


steppingStoneControllers.controller('ResumeListController', ['$scope', '$routeParams', 'resumeFactory',
  	function($scope, $routeParams, $resumeFactory) {
		console.log('resume list controller')

		$resumeFactory.getAllResumes().
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

			$resumeFactory.saveNewResume(industry, description, resumeText).
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
		$resumeFactory.getResume($routeParams.id).
			success(function (resume) {
				$scope.resume = resume
				$scope.industry = resume.industry
				$scope.description = resume.description
				$scope.resumeText = resume.resumeText
			}).
			error(function() {
				console.log("show error")
			})

		$scope.editResume = function() {
			$resumeFactory.updateResume($scope.resume._id, $scope.industry, $scope.description, $scope.resumeText).
				success(function (editResume) {
					console.log("edit Success");
					$scope.resume = editResume;
				}).
				error(function() {
					console.log("edit error")
				})		
		}

	}





]);

