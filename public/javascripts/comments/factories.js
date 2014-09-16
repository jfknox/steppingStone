app.factory('commentFactory', function($http) {
   return {
        getAllComments: function(resumeId) {
            console.log(resumeId + "factory")
            return $http.get('/comments/', {
                params: {resumeId: resumeId}
            });
        },
        createComment: function(content, resumeId) {
            return $http.post('/comments/', {
                content: content,
                resumeId: resumeId
            });
        },
    }
});