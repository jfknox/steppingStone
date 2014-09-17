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
					$scope.industry = ''
					$scope.description = ''
					$scope.resumeText = ''
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


steppingStoneControllers.controller('resumeShowController', ['$scope', '$routeParams', '$cookies', '$location', 'resumeFactory', 'commentFactory', 
	function($scope, $routeParams, $cookies, $location, $resumeFactory, $commentFactory) {
		console.log('resume show controller')

		$scope.userId = $cookies.userId;

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

		$scope.deleteResume = function() {
			$resumeFactory.deleteResume($scope.resume._id).
				success(function() {
					console.log("edit Success");
					$location.path('/resumes');
				}).
				error(function() {
					console.log("delete error")
				})
		}

		$commentFactory.getAllComments($routeParams.id, true).
			success(function (comments) {
				$scope.comments = comments

			}).
			error(function() {
				console.log("comment show error")
			})

		$scope.createComment = function() {
			$commentFactory.createComment($scope.content, $scope.resume._id, $scope.anonymous).
				success(function(newComment) {
					console.log("left Comment");
					$scope.comments.push(newComment);
					$scope.content = ""
					$scope.anonymous = false
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
		

	}





]);

