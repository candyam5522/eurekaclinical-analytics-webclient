(function(){
    'use strict';

    /**
     * @ngdoc overview
     * @name eureka.sourceconfig
     * @description
     * The module for the jobs section of the Eureka application.
     */
    
    angular.module('eureka.sourceconfig', []);

    angular.module('eureka.sourceconfig').config(sourceconfigConfig);

    sourceconfigConfig.$inject = ['$stateProvider'];

    function sourceconfigConfig($stateProvider) {
        $stateProvider
            .state('sourceconfig', {
                url: '/sourceconfig',
                templateUrl: 'eureka/sourceconfig/views/main/main.html',
                controller: 'sourceconfig.MainCtrl',
                controllerAs: 'sourceconfig'
            })
            .state('newSourceconfig', {
                url: '/sourceconfig/new',
                templateUrl: 'eureka/sourceconfig/views/edit/edit.html',
                controller: 'sourceconfig.EditCtrl',
                controllerAs: 'editSourceconfig'
            })
            .state('editSourceconfig', {
                url: '/sourceconfig/edit/:key',
                templateUrl: 'eureka/sourceconfig/views/edit/edit.html',
                controller: 'sourceconfig.EditCtrl',
                controllerAs: 'editSourceconfig'
            });
    }

}());
