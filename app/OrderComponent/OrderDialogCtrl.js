'use strict';

cafeApp.controller('OrderDialogCtrl', function OrderDialogCtrl($mdDialog, $rootScope, OrderService, MenuService, AccountService) {
    var that = this;
    this.curCredits = sessionStorage.getItem('credits');

    MenuService.query().$promise.then( function (res){
        that.menu = res;
    });

    this.topUp = function (topUpOn) {
        AccountService.update({email: sessionStorage.getItem('email'), credits: topUpOn}).$promise.then(function (user) {
            that.curCredits += topUpOn;
            sessionStorage.setItem('credits', +sessionStorage.getItem('credits') + topUpOn);
        });
    };
    this.isEnoughCredits = function (price) {
        return this.curCredits - price >= 0;
    };
    this.changeCurCredits = function (item) {
        if (item.checked){
            this.curCredits -= item.price;
        } else {
            this.curCredits += item.price;
        }
    };
    this.closeDialog = function() {
        $mdDialog.hide();
        $rootScope.$emit("creditsAmount", { credits: sessionStorage.getItem('credits')});
    };
    this.confirmOrder = function () {
        var order = [];
        that.menu.forEach(function (elem, i, arr) {
            if(elem.checked) {
                order.push({id: elem.id, title: elem.title, price:elem.price});
            }
        });
        if(order.length) {
            OrderService.save({email:sessionStorage.getItem('email'), order: order});
            $rootScope.$emit('renewOrders');
            $mdDialog.hide();
            sessionStorage.setItem('credits', this.curCredits);
            $rootScope.$emit("creditsAmount", { credits: this.curCredits });
        }
    };
});