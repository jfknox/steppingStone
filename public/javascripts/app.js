var app = angular.module('steppingStone', ['ngRoute', 'steppingStoneControllers']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/resumes', {
        templateUrl: 'resumes/index.html'
      }).
      when('/resumes/:id', {
        templateUrl: 'resumes/show.html'
      }).

      when('/home', {
        templateUrl: 'home/index.html'
      }).
      when('/profile', {
        templateUrl: 'users/profile.html'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

