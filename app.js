(function()
{
  angular.module('shoppingListApp',[])
  .controller('shoppingListAppController',shoppingListAppController)
  .provider('shoppingListService',shoppingListServiceProvider);
  shoppingListAppController.$inject=['shoppingListService'];
  function shoppingListAppController(shoppingListService)
  {
    var list=this;
    list.addToList=function()
    {
      shoppingListServiceProvider.addToList(list.currentItem)
    }

  }
  function shoppingListServiceProvider()
  {
    var provider=this;
    provider.defaults={
      maxitems:4
    };
    provider.$get=function()
    {
      console.log('factory method called by angular');
      var shoppingListAppServiceInstance=new ShoppingListService(provider.defaults.maxitems);
      return shoppingListAppServiceInstance;
    }
  }
  function ShoppingListService(maxitems)
  {
    console.log('ShoppingListService invoked ');
    var service=this;
    var listAddedItems=[];
    service.addToList=function(currentItem)
    {

      console.log('adding current item to the list',currentItem);
      if(listAddedItems.length<=maxitems)
      {
        listAddedItems.push(currentItem);
        console.log('item added successfully');

      }
      else
      {
        console.log('maximum item count reached',maxitems);
      }



    };
  }


})();
