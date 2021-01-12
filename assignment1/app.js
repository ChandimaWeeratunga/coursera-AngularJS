(function() {
    'use strict';
    angular.module('LunchCheck', [])
    .controller('LunchController', LunchController);

    LunchController.$inject = ['$scope'];
    function LunchController($scope) {
        $scope.food = "";
        $scope.msg = "";
        $scope.findState = function () {
            var list = $scope.food;
            var items = list.split(',');
            var size = items.length;
            if(items[0] == ""){
                $scope.msg = "Enter food items";
            }else if(size <= 3){
                $scope.msg = "Enjoy!";
            }else{
                $scope.msg = "Too Much!";
            }
            
        }
    }
})();