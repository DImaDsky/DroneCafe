'use strict';

var cafeApp = angular.module('myApp', [
    'ui.router',
    'ngMessages',
    'ngMaterial',
    'ngResource'
]).
config(function($stateProvider) {
    $stateProvider
        .state({
            name: 'client',
            url: '/',
            templateUrl: 'app/Client/Client.html',
            controller: 'ClientCtrl as vm'
        })
        .state({
            name: 'kitchen',
            url: '/kitchen',
            templateUrl: 'app/Kitchen/Kitchen.html',
            controller: 'KitchenCtrl as vm'
        })
        .state({
            name: 'order',
            url: '/order',
            templateUrl: 'app/OrderComponent/Order.html',
            controller: 'OrderCtrl as vm'
        });
}).
config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('blue-grey');
});

// cafeApp.run(function ($rootScope) {
//     $rootScope.globalVar
// });