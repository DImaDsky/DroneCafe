'use strict';

cafeApp.controller('ClientCtrl', function($rootScope, OrderService, SocketService) {
    var that = this;

    $rootScope.$watch('authorized', function (newVal,oldVal) {
        var email = sessionStorage.getItem('email');
        $rootScope.email = email;
        that.authorized = !!email;
        if(that.authorized){
            $rootScope.name = sessionStorage.getItem('name');
            $rootScope.credits = sessionStorage.getItem('credits');
            $rootScope.$on('renewOrders', function () {
                getOrder(email);
            });
            getOrder(email)
        }
    });

    function getOrder(email) {
        OrderService.query({email: email}).$promise.then(function (data) {
            that.orders = data;
        });
    }

    SocketService.on('status-change', function (changed) {
        var i = that.orders.length;
        while (i--){
            if (changed._id == that.orders[i]._id){
                that.orders[i] = changed;
                break;
            }
        }
    });
    SocketService.on('dish-delete', function (changed) {
        var i = that.orders.length;
        while (i--){
            if (changed._id == that.orders[i]._id){
                that.orders.splice(i,1);
                break;
            }
        }
    });
});
