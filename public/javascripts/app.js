var app = angular.module('steppingStone', ['ngRoute', 'steppingStoneControllers']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/resumes', {
        templateUrl: 'resumes/index.html',
        controller: 'ResumeListController'
      }).
      when('/resumes/:id', {
        templateUrl: 'resumes/show.html',
        controller: 'resumeShowController'
      }).

      when('/home', {
        templateUrl: 'home/index.html',
        controller: 'HomeController'
      }).
      when('/users', {
        templateUrl: 'users/index.html',
        controller: 'usersController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

