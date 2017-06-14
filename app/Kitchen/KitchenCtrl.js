'use strict';

angular
.module('myApp')
.controller('KitchenCtrl', function(OrderService) {
    console.log('KitchenCtrl')
    var that = this;

    OrderService.query().$promise.then(function (data) {
        that.orders = data;
        console.log('K data: ', data);
    });
});
