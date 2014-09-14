app.factory('userFactory', function($http) {
   return {
        getAllUsers: function() {
			return $http.get('/users/');
        },
        updateUser: function(user) {
        	return $http.put('/users/' + user._id, user);
        }
   }
});



