(function() {
  'use strict';

  angular
    .module('nglrp')
    .directive('registrationForm', registrationForm);

  /** @ngInject */
  function registrationForm(HttpServise) {
    var directive = {		
      restrict: 'E',
	  replace: true,
      transclude: true,
      templateUrl: 'app/components/registration/registrationForm.html',
      require: 'ngModel',
      scope: true,
	  link: linkFunc,
	  controller: RegistrationFormController,
      controllerAs: 'vm'
    };

    return directive;

	function linkFunc(scope, el, attr, vm) { 
	  //email validation on the server at runtime
	  var mailValue = scope.userForm.emailAddress;
      function setAsLoading(bool) {
        mailValue.$setValidity('recordLoading', !bool);   	
      }
      function setAsAvailable(bool) {
		mailValue.$setValidity('recordAvailable', bool);
      } 
      mailValue.$parsers.push(function(value) {
        if(!value || value.length == 0) return;

        setAsLoading(true);
        setAsAvailable(false);
        HttpServise.getHttp(value)
          .success(function() {
            setAsLoading(false);
            setAsAvailable(true);
          })
          .error(function() {
            setAsLoading(false);
            setAsAvailable(false);
          });
	    return value;   	
      })
    }
    /** @ngInject */
    function RegistrationFormController($scope, LoginService, $location, $filter) {     
      var vm = this;
	  vm.regex = /^[0-9 ]+$/;
	  vm.userData = {};
	  vm.submitForm = function(data) {
        if ($scope.userForm.$valid) {
		  vm.userData = data;
          vm.userData.lastName = $filter('uppercase')(data.lastName);
          vm.userData.email = $filter('uppercase')(data.email);			  
          RegistrationValidation(vm.userData);
        } 
      };
	  function RegistrationValidation(userInfo) {
		  
        LoginService.validationUserForm(userInfo)
		  .then(function (response) {					  
            if(response.status) {
			   vm.yousuperstar = true; 
            }
            else{
               alert('Validation error');
            }
			return LoginService.createUserByEmail(response);
          })
		  .then(function (resultOfValidation) {
			if(resultOfValidation.status) {			   
               alert('You have successfully Registration');
               $location.path('login');
            }
            else{
               alert('Registration error');
            } 
            return resultOfValidation;
          })
          .catch(function (err) {
            alert('Error in catch');
          });
      }	
    }
  }

})();
