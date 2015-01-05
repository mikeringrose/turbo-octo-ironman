(function() {
  var app = angular.module('contactListApp');

  app.controller('ContactController', ['$scope', '$http', function($scope, $http) {
    var self = this;
    self.contact = {};
    self.contacts = [];

    self.currentPage = 0;
    self.pageSize = 10;

    self.query = {};

    $http.get('/data/contacts.json').success(function(data) {
      self.contacts = data;
    });

    self.nextPage = function() {
      if (!this.isLastPage()){
        this.currentPage += 1;
      }
    }

    self.previousPage = function() {
      if (this.currentPage > 0) {
        this.currentPage -= 1;
      }
    }

    self.isLastPage = function() {
      return (this.contacts.length/this.pageSize == (this.currentPage + 1) );
    }

    self.searchBy = function(contact) {
      var aMatch = true;

      if (self.query.name) {
        aMatch &= filterByName(contact, self.query.name);
      }

      if (self.query.state) {
        aMatch &= filterByState(contact, self.query.state);
      }

      return aMatch;
    }

    self.addContact = function() {
      this.contacts.push(this.contact);
      this.contact = {};
      $scope.contactForm.$setPristine();
    }

    self.editContact = function(contact) {
      this.contact = contact;
    }

    function filterByName(contact, name) {
      return (contact.first_name.toLowerCase().indexOf(name.toLowerCase()) >= 0 || contact.last_name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
    }

    function filterByState(contact, state) {
      return contact.state === state;
    }
  }]);

  app.directive('contactDetails', function() {
    return {
      restrict: 'A',
      templateUrl: 'views/contact-details.html'
    };
  });

  app.directive('contactForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/contact-form.html'
    };
  });

  app.filter('startAt', function() {
    return function(arr, start) {
      start = +start;
      return arr.slice(start);
    }
  });
})();
