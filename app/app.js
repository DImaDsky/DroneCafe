'use strict';

// Declare app level module which depends on views, and components
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
            templateUrl: 'Client/Client.html',
            controller: 'ClientCtrl as vm'
        })
        .state({
            name: 'kitchen',
            url: '/kitchen',
            templateUrl: 'Kitchen/Kitchen.html',
            controller: 'KitchenCtrl as vm'
        })
        .state({
            name: 'order',
            url: '/order',
            templateUrl: 'OrderComponent/Order.html',
            controller: 'OrderCtrl as vm'
        });
}).
config(function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        // If you specify less than all of the keys, it will inherit from the default shades
        .accentPalette('blue-grey');
});