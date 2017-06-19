'use strict';

angular
.module('myApp')
.controller('KitchenCtrl', function(OrderService, SocketService) {
    console.log('KitchenCtrl')
    var that = this;

    OrderService.query().$promise.then(function (data) {
        that.orders = data;
        console.log('K data: ', data);
    });

    this.start = function (item) {
        debugger
        //SocketService.emit('status-change', {status: 'In process'});
    };
    this.ready = function (item) {
        //SocketService.emit('status-change', {status: 'ready'});
    };
});
