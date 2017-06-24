'use strict';

cafeApp.controller('ClientCtrl', function($rootScope, OrderService) {
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
/*
    $scope.recievedTroughSocket = "still waiting for data...";
    $scope.sendWithSocket = function(msg){
        socket.emit("something", msg);
    };
    socket.on("greetings", function(data){
        console.log("user data: " + JSON.stringify(data));
        $scope.recievedTroughSocket = data.msg;
    });
    /**/
});
