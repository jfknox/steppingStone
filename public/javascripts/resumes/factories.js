app.factory('resumeFactory', function($http) {
   return {
        getAllResumes: function(userId) {
            return $http.get('/resumes/', {
            params: {userId: userId}
            });
        },
        saveNewResume: function(industry, description, file) {
            var formData = new FormData();
            formData.append('file', file);
            formData.append('industry', industry);
            formData.append('description', description);

            return $http.post('/resumes/', formData, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            });
            
        },
        getResume: function(id) {
            return $http.get('/resumes/' + id );
        },
        updateResume: function(id, industry, description, file) {
            var formData = new FormData();
            formData.append('file', file);
            formData.append('industry', industry);
            formData.append('description', description);

            return $http.put('/resumes/' + id, formData, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            });

        },
        deleteResume: function(id) {
            return $http.delete(/resumes/ + id)
        }

    }
});