'use strict';

angular.module('myApp').component('addDishComponent', {

    controller: function ($mdDialog, $scope,  MenuService) {
        this.openDialog = function () {

            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                templateUrl: 'OrderComponent/OrderDialog.html',
                controllerAs: 'dialog',
                // locals: {
                //     items: $scope.items // to pass items in OrderDialogCtrl
                // },
                controller: OrderDialogCtrl
            });
            function OrderDialogCtrl($mdDialog) {

                var self = this;
                var menuPromise = MenuService.query();

                menuPromise.$promise.then( function (res){
                    self.menu = res;
                });
                this.closeDialog = function() {
                    $mdDialog.hide();
                };
                this.confirmOrder = function () {
                    console.log('confirmOrder')
                };
            }
        };

    },
    templateUrl: './OrderComponent/Order.html'
});
