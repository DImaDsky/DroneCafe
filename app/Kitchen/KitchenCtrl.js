'use strict';

cafeApp.controller('KitchenCtrl', function(OrderService, SocketService) {
    var that = this;

    OrderService.query().$promise.then(function (data) {
        that.orders = data;
    });

    SocketService.on('new-order', function (order) {
        that.orders = that.orders.concat(order);
    });

    this.start = function (dish) {
        dish.status = 'In process';
        SocketService.emit('status-change', dish);
    };
    this.ready = function (dish) {
        dish.status = 'On the way';
        SocketService.emit('status-change', dish);
    };
});
