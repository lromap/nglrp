(function() {
  'use strict';
  
  angular
    .module('nglrp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
