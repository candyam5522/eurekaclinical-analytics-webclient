(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name eureka.sourceconfig.controller:MainCtrl
     * @description
     * This is the main controller for the jobs section of the application.
     * @requires JobService
     */

    angular
	.module('eureka.sourceconfig')
	.controller('sourceconfig.MainCtrl', MainCtrl);

    MainCtrl.$inject = ['SourceconfigService', '$interval', '$scope', 'ProxyService'];

    function MainCtrl(SourceconfigService, $interval, $scope, ProxyService) {
	var vm = this,
	    totalFiles,
	    filesCompleted;
	vm.radioData = 1;
	vm.treeMultiDropZoneItems = [];

	function displayDeleteError(msg) {
			vm.deleteErrorMsg = msg;
		}

		function displayLoadError(msg) {
			vm.loadErrorMsg = msg;
		}

		vm.deleteSourceconfig = function (sourceconfigToDelete) {

			$uibModal.open({
				templateUrl: 'myModal.html',
				controller: 'sourceconfig.ModalCtrl',
				controllerAs: 'mo',
				resolve: {
					displayName: function () {
						return sourceconfigToDelete.displayName;
					}
				}
			}).result.then(
					function () {
						removePhenotype(sourceconfigToDelete);
					},
					function (arg) {
						console.log(arg);
					}
			);
		};

		function deleteSuccess() {
			vm.tableParams.filter({});
			for (var i = 0; i < vm.props.length; i++) {
				if (vm.props[i].displayName === vm.currentSelectedItem.displayName) {
					vm.props.splice(i, 1);
					break;
				}
			}
			vm.tableParams.reload();
		}

		function removeSourceconfig(sourceconfig) {
			vm.currentSelectedItem = sourceconfig;
			vm.deferred = SourceconfigService.removeSourceconfig(sourceconfig.id).then(deleteSuccess, displayDeleteError);
		}

	

	SourceconfigService.getSourceConfigs()
	    .then(function (data) {

		vm.sourceConfigs = data;

		vm.jobSourceConfig = vm.sourceConfigs[0];
	    }, displayLoadError);

	SourceconfigService.getJobModes()
	    .then(function (data) {
		vm.jobModes = data.filter(item => item.name !== 'UNKNOWN');
		angular.forEach(vm.jobModes, function(item) {
		    if (item.default) {
			vm.jobMode=item.id;
		    }
		});
	    }, displayLoadError);

	function routeChange(event, toState, toParams, fromState, fromParams) {
	    $interval.cancel(stopTime);
	    onRouteChangeOff();
	}

	function earliestDate(ed) {
	    console.log(ed);
	}

	function latestDate(ld) {
	    console.log(ld);
	}
    }
})();
