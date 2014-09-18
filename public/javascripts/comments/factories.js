app.factory('commentFactory', function($http) {
   return {
        getAllComments: function(id, isResumeId) {
            //if there is a resume id leave all coments related to the resume
            if (isResumeId) {
                console.log(id + "factory")
                return $http.get('/comments/', {
                    params: {resumeId: id}
                });
            //else there will be a user id and then return all comments relative to the userid
            } else{
                return $http.get('/comments/', {
                    params: {userId: id}
                });
            }

        },
        createComment: function(content, resumeId, anonymous) {
            return $http.post('/comments/', {
                content: content,
                resumeId: resumeId, 
                anonymous: anonymous
            });
        },

        deleteComment: function(id) {
            return $http.delete(/comments/ + id)
        }
    }
});