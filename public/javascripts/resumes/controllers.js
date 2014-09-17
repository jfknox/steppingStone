var steppingStoneControllers = angular.module('steppingStoneControllers');


steppingStoneControllers.controller('ResumeListController', ['$scope', '$routeParams', '$location', 'resumeFactory', 'linkedinFactory',
  	function($scope, $routeParams, $location, $resumeFactory, $linkedinFactory) {
		console.log('resume list controller')
		$scope.modalShown = false

		$resumeFactory.getAllResumes().
			success(function (resumes) {
				$scope.resumes = resumes
				$linkedinFactory.refreshLinkedin()

			}).
			error(function() {
				console.log("show error")
			})
	

		$scope.newResume = function() {
			var industry = $scope.industry
			var description = $scope.description
			var resumeText = $scope.resumeText
			console.log(industry)
			$resumeFactory.saveNewResume(industry, description, resumeText).
				success(function (newResume) {
					console.log("new Success");
					$location.path('/resumes/' + newResume._id);
				}).
				error(function() {
					console.log("new error")
				})		
		}
	
     
        $scope.logClose = function() {
        	console.log('close!');
        };
        $scope.toggleModal = function() {
        	console.log("toggle")
        	$scope.modalShown = !$scope.modalShown;
        };
	     

}]);


steppingStoneControllers.controller('resumeShowController', ['$scope', '$routeParams', '$cookies', '$location', 'resumeFactory', 'commentFactory', 'linkedinFactory',
	function($scope, $routeParams, $cookies, $location, $resumeFactory, $commentFactory, $linkedinFactory) {
		console.log('resume show controller')

		$scope.userId = $cookies.userId;
		$scope.modalShown = false

		$resumeFactory.getResume($routeParams.id).
			success(function (resume) {
				$scope.resume = resume
				$scope.industry = resume.industry
				$scope.description = resume.description
				$scope.resumeText = resume.resumeText
				$linkedinFactory.refreshLinkedin()

			}).
			error(function() {
				console.log("show error")
			})

		$commentFactory.getAllComments($routeParams.id, true).
			success(function (comments) {
				$scope.comments = comments;
				$linkedinFactory.refreshLinkedin()
			}).
			error(function() {
				console.log("comment show error")
			})

		$scope.editResume = function() {
			console.log('edit resume')
			$resumeFactory.updateResume($scope.resume._id, $scope.industry, $scope.description, $scope.resumeText).
				success(function (editResume) {
					console.log("edit Success");
					$scope.resume = editResume;
					$scope.modalShown = false
				}).
				error(function() {
					console.log("edit error")
				})		
		}

		$scope.deleteResume = function() {
			console.log('delete resume')
			$resumeFactory.deleteResume($scope.resume._id).
				success(function() {
					console.log("delete Success");
					$location.path('/resumes');
				}).
				error(function() {
					console.log("delete error")
				})
		}

		$scope.createComment = function() {
			$commentFactory.createComment($scope.content, $scope.resume._id, $scope.anonymous).
				success(function(newComment) {
					console.log("left Comment");
					$scope.comments.push(newComment);
					$scope.content = ""
					$scope.anonymous = false

					$linkedinFactory.refreshLinkedin()
				}).
				error(function() {
					console.log("comment error")
				});
		}


		$scope.deleteComment = function(commentId) {	
			$commentFactory.deleteComment(commentId).
				success(function (comment) {
					$scope.comments = $scope.comments.filter(function(comment) {
						return comment._id !== commentId;
					});
				}).
				error(function() {
					console.log("delete comment fail")
				});
		}
	

		$scope.logClose = function() {
        	console.log('close!');
        };
        $scope.toggleModal = function() {
        	console.log("toggle")
        	$scope.modalShown = !$scope.modalShown;
        };
	     
	}

]);

