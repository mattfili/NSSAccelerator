angular.module('valueprop')

.factory('FIRE', function($http, $resource) {
	return {
		addConsideration: function (comment) {
			console.log(comment)
		}
	}
})
