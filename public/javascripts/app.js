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
      when('/users', {
        templateUrl: 'users/index.html'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

