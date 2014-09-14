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



app.factory('resumeFactory', function($http) {
   return {
        showAllResumes: function() {
            return $http.get('/resumes/');
        },
        newResume: function(industry, description, resumeText) {
            return $http.post('/resumes/', {
                description: description,
                industry: industry, 
                resumeText: resumeText
            });
        },
        showResume: function(id) {
            return $http.get('/resumes/' + id );
        }
    }
});