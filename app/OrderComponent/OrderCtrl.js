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
                controller: 'OrderDialogCtrl'//TODO: to separate file
            });
        };

    },
    templateUrl: './app/OrderComponent/Order.html'
});
