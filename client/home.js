Groups = new Mongo.Collection(null);

Groups.insert({
    cd:"A",
    name:"name A"
});
Groups.insert({
  cd:"B",
    name: "name B",
    items: [{name: 'item1'}, {name: 'item2'}]
});

/*
From a reloaded page, the following actions produce:

 Exception in template helper: TypeError: Cannot read property 'apply' of undefined
 at Object.helpers.(anonymous function) (http://localhost:3000/packages/manuel_viewmodel.js?hash=c6a7...

 1. Select Group B
 2. Select Group None
 3. Select Group A

 Any other combination leading to selecting Group A, as long as it does not follow the above sequence does not
  produce the exception.

*/

Template.selectGroup.viewmodel({
  selections:["None","A","B"],
  selected:'',
  group(){
    return Groups.findOne({cd:this.selected()})
  }
});

// if the dummy property is removed(i.e, viewmodel does not have any explicit properties)
// or if a 'items:[]' property is added to the view model, then the exception does not show.

Template.showGroup.viewmodel({
  dummy:''
});

