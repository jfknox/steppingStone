app.factory('userFactory', function($http) {
	return {

		getUser: function(id) {
			return $http.get('/users/' + id)
        	}
    


    }



	


});
