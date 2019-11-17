(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name eureka.JobService
     * @description
     * This service provides an API to interact with the REST endpoint for jobs.
     * @requires $http
     * @requires $q
     */

    angular
	.module('eureka.sourceconfig')
	.factory('SourceconfigService', SourceconfigService);

    SourceconfigService.$inject = ['$http', '$q', 'ProxyService'];

    function SourceconfigService($http, $q, ProxyService) {
	
	return ({
	    getSourceConfigs: getSourceConfigs,
            getSourceConfig: getSourceConfig,
	    getJobModes: getJobModes,
	});


	//get a list of sourceConfigs
	function getSourceConfigs() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/sourceconfigs')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}
        
        function getSourceConfig(config) {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/sourceconfigs/' + config)
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function getJobModes() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/jobmodes')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function handleSuccess(response) {
	    return response.data;
	}

	function handleError(response) {
	    if (!angular.isObject(response.data) && !response.data) {
		if (response.statusText) {
		    return ($q.reject(response.statusText));
		} else {
		    return ($q.reject('The server may be down.'));
		}
	    }
	    return ($q.reject(response.data));
	}
    }

}());
