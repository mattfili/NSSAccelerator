angular.module('valueprop', ['ui.router', 'ngAnimate', 'ngResource'])

.constant('FIRE_URL', 'https://nssaccelerator.firebaseio.com/')

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.when('', '/');
	$urlRouterProvider.otherwise('/landing');

	$locationProvider.html5Mode({
		enabled: false,
		requireBase: false
	});

	$stateProvider
	.state('start', {
	    abstract: true,
	    templateUrl: 'assets/landing.html',
	    controller: 'main'
  	})
	.state('start.dash', {
		url: '/landing',
	    views: {
	      	'header': {
	        templateUrl: 'assets/components/header.html'
	      },
	      	'mission': {
	        templateUrl: 'assets/components/mission.html'
	      },
	      	'program': {
	        templateUrl: 'assets/components/program.html'
	      },
	      	'comp': {
	        templateUrl: 'assets/components/comp.html'
	      },
	      'consid': {
	        templateUrl: 'assets/components/consid.html'
	      }
	    }
	})
	
})