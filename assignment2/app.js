(function() {
    'use strict';
    angular.module('ShoppingListCheckOffApp',[])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var buy = this;
        buy.items = ShoppingListCheckOffService.getBuy();
        buy.boughtItem = function (itemIndex){
            try {
                ShoppingListCheckOffService.buyItem(itemIndex);
            }catch (error) {
                buy.errorMessage = error.message;
            }
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var bought = this;
        bought.items = ShoppingListCheckOffService.getBought();
        bought.checkEmpty = function(){
            if(bought.items.length == 0){
                bought.errorMessage = "Nothing bought yet.";
            }else{
                bought.errorMessage = "";
            }
        }
        // bought.checkEmpty();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var buyList = [
            {
                name: "cookies",
                quantity: "10"
            },
            {
                name: "biscuits",
                quantity: "5"
            },
            {
                name: "chocolates",
                quantity: "3"
            }
        ];
        var boughtList = [];

        service.getBuy = function() {
            return buyList;
        };
        service.getBought = function(){
            return boughtList;
            
        };
        service.checkEmpty = function(itemList){  
            if(itemList.length == 0){
                throw new Error("Nothing bought yet.")
            }
        }
        service.addItem = function(itemName, quantity){
            var item = {
                name: itemName,
                quantity: quantity
            };
            
            boughtList.push(item);
        };
        service.buyItem = function(itemIndex) {
            // if (buyList.length >= 1){
            //     var itemName = buyList[itemIndex].name;
            //     var quantity = buyList[itemIndex].quantity;
            //     service.addItem(itemName, quantity);
            //     buyList.splice(itemIndex, 1);
            // }else{
            //     throw new Error("Everything is bought!");
            // }
            var itemName = buyList[itemIndex].name;
            var quantity = buyList[itemIndex].quantity;
            service.addItem(itemName, quantity);
            buyList.splice(itemIndex, 1);
            if(buyList.length == 0){
                throw new Error("Everything is bought!");
            }
            
            
        };

        
    }
})();