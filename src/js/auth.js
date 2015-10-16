angular.module('valueprop')
  .factory('Auth', ['$firebaseAuth', 'fbutil', function($firebaseAuth, fbutil, FIRE_URL) {
    return $firebaseAuth(fbutil.ref());
  }]);
