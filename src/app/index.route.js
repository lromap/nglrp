(function() {
  'use strict';
  
  angular
    .module('nglrp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/homePage/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('login', {
          url: "/login",
          templateUrl: "app/main/loginPage/loginPage.html",
          controller: 'LoginPageController',
          controllerAs: 'vm'
      })
      .state('registration', {
          url: "/registration",
          templateUrl: "app/main/registrationPage/registrationPage.html",
          controller: 'RegistrationPageController',
          controllerAs: 'vm'
      });

      $urlRouterProvider.otherwise('/');
  }

})();
