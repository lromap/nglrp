(function() {
  'use strict';
  
  angular
    .module('nglrp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(LoginService) {
  
    var vm = this;
	var status = LoginService.getUserState();
	var data = LoginService.getAuthUser();
    if(status){	  
	  if(data){
		vm.text = 'Well done, and now come in!!!';  
	  }else{
		  vm.text = 'Hi guy!!!';
	  }
	}else{
	  vm.text = 'Sign up quickly!';
	}
    
  }
})();
