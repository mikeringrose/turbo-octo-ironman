'use strict';

/**
 * @ngdoc function
 * @name contactListApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the contactListApp
 */
angular.module('contactListApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
