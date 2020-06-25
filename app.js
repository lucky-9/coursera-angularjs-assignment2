(function () {
  var app = angular.module("shoppingCart", []);
  app.controller("ctrl1", ctrl1);
  app.controller("ctrl2", ctrl2);
  app.service("cartService", cartService);

  ctrl1.$inject = ["cartService"];
  function ctrl1(cartService) {
    var list = this;
    list.itemName = "";
    list.itemQuantity = "";
    list.addToCart = function () {
      cartService.addItemToCart(list.itemName, list.itemQuantity);
      list.itemName = "";
      list.itemQuantity = "";
    };
    list.addToBrought = function (index) {
      cartService.removeFromCartAndADDToBrought(index);
    };

    list.cartItemsList = cartService.getShoppingItems();
  }

  ctrl2.$inject = ["cartService"];
  function ctrl2(cartService) {
    var broughtList = this;
    broughtList.removeFromBrought = function (index) {
      cartService.removeFromBrought(index);
    };

    broughtList.broughtItemsList = cartService.getBroughtItems();
  }

  function cartService() {
    var cart = this;
    var shoppingItems = [
      {
        itemName: "cookies",
        itemQuantity: 10,
      },
      {
        itemName: "chocos",
        itemQuantity: "1pkt",
      },
      {
        itemName: "cheese",
        itemQuantity: "1pkt",
      },
      {
        itemName: "chiken",
        itemQuantity: "1kg",
      },
      {
        itemName: "Bread",
        itemQuantity: "1pkt",
      },
    ];
    var broughtItems = [];

    cart.addItemToCart = function (itemName, itemQuantity) {
      let item = {
        itemName,
        itemQuantity,
      };
      shoppingItems.push(item);
    };
    cart.removeFromCartAndADDToBrought = function (index) {
      console.log("in service method");
      broughtItems.push(shoppingItems[index]);
      shoppingItems.splice(index, 1);
    };

    cart.removeFromBrought = function (index) {
      console.log("removed item: ", broughtItems[index]);
      shoppingItems.push(broughtItems[index]);
      broughtItems.splice(index, 1);
    };
    cart.getShoppingItems = function () {
      return shoppingItems;
    };

    cart.getBroughtItems = function () {
      return broughtItems;
    };
  }
})();
