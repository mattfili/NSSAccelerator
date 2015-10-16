angular.module('valueprop', ['ui.router', 'ngAnimate', 'ngResource', 'firebase', 'ui.bootstrap', 'iso' ,'iso.directives', 'iso.services'])

.constant('FIRE_URL', 'https://nssaccelerator.firebaseio.com/')

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.when('', '/');
	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode({
		enabled: false,
		requireBase: false
	});

	$stateProvider
	.state('start', {
	    abstract: true,
	    templateUrl: 'assets/landing.html',
	    controller: 'main',
	    controllerAs: 'main'
  	})
	.state('start.dash', {
		url: '/',
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
	      'consid': {
	        templateUrl: 'assets/components/consid.html'
	      },
	      'login': {
	      	templateUrl: 'assets/components/login.html',
	      	controller: 'LoginCtrl'
	      },
	      'considCards@start.dash': {
	      	templateUrl: 'assets/components/considCards.html',
	      	controller: 'considCtrl',
	      	controllerAs: 'considCtrl'
	      }
	    }
	})

	.state('start.dash.consid', {
		url: 'considerations/:id',
		views: {
			'considChatter@start.dash': {
				templateUrl: 'assets/components/chatter.html'
			}
		}
	})
	
})
