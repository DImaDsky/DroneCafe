'use strict';

cafeApp.controller('ClientCtrl', function($rootScope, OrderService) {
    var that = this;
    var email = sessionStorage.getItem('email');

    $rootScope.email = email;
    $rootScope.login = sessionStorage.getItem('login');
    $rootScope.credits = sessionStorage.getItem('credits');

    OrderService.query({email:email}).$promise.then(function (data) {
        that.orders = data;
    });

    $rootScope.$watch('authorized', function (newVal,oldVal) {
        that.authorized = !!email;
    });
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
