app.factory('resumeFactory', function($http) {
   return {
        getAllResumes: function() {
            return $http.get('/resumes/');
        },
        saveNewResume: function(industry, description, resumeText) {
            return $http.post('/resumes/', {
                description: description,
                industry: industry, 
                resumeText: resumeText
            });
        },
        getResume: function(id) {
            return $http.get('/resumes/' + id );
        },
        updateResume: function(id, industry, description, resumeText) {
            return $http.put(/resumes/ + id , {
                description: description,
                industry: industry, 
                resumeText: resumeText
            });

        }
    }
});