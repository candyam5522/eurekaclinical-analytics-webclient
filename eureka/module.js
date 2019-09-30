(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name eureka
     * @description
     *
     * # Eureka Documentation
     *
     * Do you need help understanding the project structure or what services and directives you have available to you
     * in the Eureka Angular application? You've come to the right place!
     *
     * ## How to use this documentation
     *
     * This code-base is self-documenting; this documentation is automatically generated from comments left throughout
     * the code. If there is a problem with it, it is because the comments in the code were not updated.
     *
     * This project is broken down into several modules. Each module represents a section of the application. Inside
     * each module you will find views, directives, and services specific to that module. This allows you to bite off
     * code changes in smaller pieces and keeps everything organized in a sane manner.
     *
     * @requires ui.router
     * @requires ui.tree
     * @requires angularValidator
     * @requires cohorts
     * @requires phenotypes
     * @requires register
     */
    
    angular.module('eureka', [
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.datepickerPopup',
        'ui.tree',
        'angularValidator',
        'ngMessages',
        'ngTable',
	'ngCookies',
        'eureka.cohorts',
        'eureka.phenotypes',
        'eureka.help',
        'eureka.jobs',
        'eureka.sourceconfig',
	'eureka.index',
	'eureka.logout',
        'flow']);

    angular.module('eureka').run(eurekaRun);
    angular.module('eureka').config(eurekaConfig);

    eurekaRun.$inject = ['$rootScope', 'ProxyService', 'UserService', 'ConfigFileService', 'RegistryService', '$window', '$timeout'];
    eurekaConfig.$inject = ['$urlRouterProvider'];

    function eurekaRun($rootScope, ProxyService, UserService, ConfigFileService, RegistryService, $window, $timeout) {
        
	$rootScope.userVerficationPerformed = false;
	$rootScope.inceptionYear = '2012';
	$rootScope.currentYear = new Date().getFullYear();

	function setupSession() {
	    function sessionBroken() {
		ProxyService.destroySession()
		    .then(function() {
			$timeout(function() {
			    $window.location.href = $rootScope.service;
			}, 500);
		    },
			  function() {
			      $rootScope.userVerficationPerformed = true;
			  });
	    }

	    function getAppProperties() {
		ProxyService.getAppProperties()
		    .then(function(data) {
			$rootScope.modes = data.appPropertiesModes;
			$rootScope.links = data.appPropertiesLinks;
			$rootScope.userVerficationPerformed = true;
		    }, function() {
			sessionBroken();
		    });
	    }

	    function getSession() {
		ProxyService.getSession().then(function(user) {
		    getAppProperties();
		    getUser();
		}, function() {
		    getAppProperties();
		});
	    }

	    function getUser() {
		UserService.getUser().then(function(user) {
		    $rootScope.user = user;
		    getRegistryUserMenuItems();
		}, function() {
		    getAppProperties();
		});
	    }

	    function getRegistryUserMenuItems() {
		RegistryService.getUserMenuItems().then(function(userMenuItems) {
		    $rootScope.registryUserMenuItems = userMenuItems;
		});
	    }
	    
	    ConfigFileService.getConfig()
		.then(function(data) {
		    $rootScope.service = data.webClientUrl;
		    $rootScope.logoutUrl = data.logoutUrl;
		    $rootScope.eurekaWebappUrl = data.eurekaWebappUrl;
		    getSession();
		}, function(msg) {
		    $rootScope.userVerficationPerformed = true;
		});
	}
	
	setupSession();
    }

    function eurekaConfig($urlRouterProvider) {
	$urlRouterProvider.otherwise('/index');
    }
    

}());
