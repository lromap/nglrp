(function() {
  'use strict';  

  angular
    .module('nglrp')
    .directive('loginForm', loginForm);
  
  /** @ngInject */
  function loginForm() {
    var directive = {	  
      restrict: 'E',
	  scope: {
        
      },
      templateUrl: 'app/components/login/loginForm.html',
      link: linkFunc,
      controller: LoginFormController,
      controllerAs: 'vm'     
    };

    return directive;

	function linkFunc(scope, el, attr, vm) {      
      
    }
    /** @ngInject */
    function LoginFormController($scope, LoginService, $location, $filter) {     
      var vm = this;
      vm.credentials = {
        username: '',
        password: ''
      };	    
	  vm.submitForm = function(user) {
        if ($scope.loginForm.$valid) {
          vm.credentials.username = $filter('uppercase')(user.email);
          vm.credentials.password = $filter('uppercase')(user.password);
          login(vm.credentials);
        } 
      };
	  function login(credentials) {
        LoginService.loginByCredentials(credentials)
		  .then(function (response) {			  
            if(response.status) {
               alert('You are logged in');
               $location.path('home');
            }
            else{
               alert('Incorrect user email or password');
            }
          });
      }	
    }
  }
})();
