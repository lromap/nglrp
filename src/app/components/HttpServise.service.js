(function() {
  'use strict';
  
  angular
    .module('nglrp')
    .factory('HttpServise', HttpServise);

  /** @ngInject */
  function HttpServise($http, URL, URLPOST) {
    var HttpServise = {};
    HttpServise.getHttp = function (credentials) {
        return $http({ 
		  method: 'GET', 
		  url: URL, 
		  params: { 'itemsPerPage': credentials.email, 'page': credentials.password } 
		});
    };
	HttpServise.postHttp = function (credentials) {
        return $http({ 
		  method: 'POST', 
		  url: URLPOST,
		  data: credentials,
          headers: {
            'Content-Type': undefined
          }
		});
    };
    return HttpServise;
  }
  
})();
