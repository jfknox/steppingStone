app = angular.module('ngModalDemo', ['ngModal']);
app.config(function(ngModalDefaultsProvider) {
  return ngModalDefaultsProvider.set({
    closeButtonHtml: "<i class='fa fa-times'></i>"
  });
});

app.factory('nodeJsServer', function($http) {
   return {
        getUsers: function() {
             //return the promise directly.
			return $http.get("/users").then(function(result) {
                //resolve the promise as the data
                return result.data;
            });
        },
        updateUser: function(user) {
        	$http.put('/users/' + user._id, user);
        }
   }
});

app.controller('stepStoneController', function($scope, nodeJsServer) {
  $scope.modalShown = false;
  $scope.email = '';
  $scope.username = '';
  $scope.password = '';

    nodeJsServer.getUsers().then(function(users) {
        $scope.users = users;
    });

  $scope.logClose = function() {
  	$scope.currentuser = undefined;
    console.log('close!');
  };
  $scope.toggleModal = function(user) {
    $scope.modalShown = !$scope.modalShown;
    $scope.currentuser = user;
  };

  $scope.editUser = function(user) {
  	//BUG: Not able to get new values from form yet
  	user.email = $scope.email || user.email;
  	user.username = $scope.username || user.username;
  	user.password = $scope.password || user.password;
  	nodeJsServer.updateUser(user);
	$scope.email = '';
	$scope.username = '';
	$scope.password = '';
  }
});