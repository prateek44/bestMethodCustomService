(function()
{
  angular.module('shoppingListApp',[])
  .controller('shoppingListAppController',shoppingListAppController)
  .provider('shoppingListService',shoppingListServiceProvider)
  .config(Config);
  Config.$inject=['shoppingListServiceProvider'];
  function Config(shoppingListServiceProvider)
  {
    console.log('Config function called');
    var config=this;
    shoppingListServiceProvider.defaults.maxitems=2;

  }
  shoppingListAppController.$inject=['shoppingListService'];
  function shoppingListAppController(shoppingListService)
  {
    console.log('shoppingListAppController');
    var list=this;
    list.addedItemsList="";
    list.addToList=function()
    {
      try {
        list.addedItemsList=shoppingListService.addToList(list.currentItem);

      } catch (e) {
        console.log('catch block');
        list.message=e.message;

      } finally {

      }

    };

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
      if(listAddedItems.length<maxitems)
      {
        listAddedItems.push(currentItem);
        console.log('item added successfully');

      }
      else
      {
        console.log('maximum item count reached',maxitems);
        throw new Error("maximum item count reached");
      }
      return listAddedItems;
    };
  }


})();
