'use strict';

angular.module('globalSliderApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider,$httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
/* Helper functions */

function trace(s) {
    if ('console' in self && 'log' in console)
        console.log(s);
}