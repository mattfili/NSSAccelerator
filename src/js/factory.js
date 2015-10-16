angular.module('valueprop')

.factory('FIRE_OBJ', function ($http, $resource, FIRE_URL, $firebaseObject) {
	return $firebaseObject( new Firebase(FIRE_URL) );
	
})

.factory('FIRE_ARRAY', function ($http, $resource, FIRE_URL, $firebaseArray) {
	return $firebaseArray( new Firebase(FIRE_URL + '/considerations') );
})

.factory('FIRE_COMMENT', function (FIRE_URL, $firebaseArray, $location, $state) {
	return $firebaseArray( new Firebase(FIRE_URL + '/comment/' + $state.params.id ) )
})

.factory('FIRE', function (FIRE_URL) {
	return new Firebase(FIRE_URL + '/considerations')
})

.factory('GET_FIRE', function (FIRE_URL, $state) {
	return new Firebase(FIRE_URL + '/comment/' + $state.params.id)
})