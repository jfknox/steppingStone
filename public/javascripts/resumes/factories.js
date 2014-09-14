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