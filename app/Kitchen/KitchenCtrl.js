'use strict';

cafeApp.controller('KitchenCtrl', function(OrderService, SocketService) {
    var that = this;

    OrderService.query().$promise.then(function (data) {
        that.orders = data;
        console.log('K data: ', data);
    });

    SocketService.on('new-order', function (order) {
        that.orders = that.orders.concat(order);
        debugger
    });

    this.start = function (item) {
        item.status = 'In process';
        SocketService.emit('status-change', item);
    };
    this.ready = function (item) {
        item.status = 'On the way';
        SocketService.emit('status-change', item);
    };
});
