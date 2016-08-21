(function() {
  'use strict';  

  angular
    .module('nglrp')
    .factory('LoginService', LoginService);

  /** @ngInject */
  function LoginService(HttpServise, $q) {
    var authUser = { status:false, data: false };
	var service = {
      authUser: authUser,
      loginByCredentials: loginByCredentials,
	  createUserByEmail: createUserByEmail,
	  validationUserForm: validationUserForm,
	  getUserState:getUserState,
	  getAuthUser:getAuthUser
    };

    return service;
    
	function loginByCredentials(credentials) {
          var deferred = $q.defer();			
          HttpServise.getHttp(credentials)
              .success(function (data, status, headers, config) {				  
				  if(data != null){
					authUser = {
                      status: true,
                      data: false
                    };  
				  }
				deferred.resolve(authUser);                
              })
              .error(function (data, status, headers, config) {
                deferred.resolve({
                  status: false,
                  data: false
                });
              });
		  return deferred.promise;
    }
	function createUserByEmail(userInfo) {
          var deferred = $q.defer();				
          HttpServise.getHttp(userInfo)
              .success(function (data, status, headers, config) {				  
				  if(data != null){
					authUser = {
                      status: true,
                      data: true
                    };  
				  }
				deferred.resolve(authUser);                
              })
              .error(function (data, status, headers, config) {
                deferred.resolve({
                  status: false,
                  data: false
                });
              });
		  return deferred.promise;
    }
	function validationUserForm(userInfo) {
          var deferred = $q.defer();			
          HttpServise.postHttp(userInfo)
              .success(function (data, status, headers, config) {				  
				  if(data != null){
					authUser = {
                      status: true,
                      data: false
                    };	 
				  }
				deferred.resolve(authUser);                
              })
              .error(function (data, status, headers, config) {
                deferred.resolve({
                  status: false,
                  data: false
                });
              });
		  return deferred.promise;
    }
	function getUserState(){ 
      return authUser.status;
    }
	function getAuthUser(){
      return authUser.data;
    }
  }
})();