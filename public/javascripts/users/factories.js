app.factory('userFactory', function($http) {
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



