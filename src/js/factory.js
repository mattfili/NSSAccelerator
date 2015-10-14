angular.module('valueprop')

.factory('FIRE', function($http, $resource) {
	return {
		comment: function (comment) {
			console.log(comment)
		}
	}
})