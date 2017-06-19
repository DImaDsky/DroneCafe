'use strict';

angular.module('myApp').component('addDishComponent', {

    controller: function ($mdDialog, $scope,  MenuService) {
        this.openDialog = function () {

            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                templateUrl: 'app/OrderComponent/OrderDialog.html',
                controllerAs: 'dialog',
                // locals: {
                //     items: $scope.items // to pass items in OrderDialogCtrl
                // },
                controller: OrderDialogCtrl
            });
            function OrderDialogCtrl($mdDialog, $rootScope, OrderService) {

                var self = this;
                MenuService.query().$promise.then( function (res){
                    self.menu = res;
                });

                this.closeDialog = function() {
                    $mdDialog.hide();
                };
                this.confirmOrder = function () {
                    var order = [];
                    self.menu.forEach(function (elem, i, arr) {
                        //TODO send only id and upload menu in kitchen for names
                        if(elem.checked) {
                            order.push({id: elem.id, title: elem.title});
                        }
                    });
                    if(order.length) {
                        OrderService.save({email:sessionStorage.getItem('email'), order: order});
                        $rootScope.$emit('renewOrders');
                        $mdDialog.hide();
                    }
                };
            }
        };

    },
    templateUrl: './app/OrderComponent/Order.html'
});
