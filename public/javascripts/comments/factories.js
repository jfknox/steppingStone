app.factory('commentFactory', function($http) {
   return {
        getAllComments: function(id, isResumeId) {
            if (isResumeId) {
                console.log(id + "factory")
                return $http.get('/comments/', {
                    params: {resumeId: id}
                });
            } else{
                return $http.get('/comments/', {
                    params: {userId: id}
                });
            }

        },
        createComment: function(content, resumeId) {
            return $http.post('/comments/', {
                content: content,
                resumeId: resumeId
            });
        },
    }
});