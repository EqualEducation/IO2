Template.registerHelper('file',function(itemID,itemTitle) {
  Meteor.call("retrieveFile", itemID, function(error, result){
    if(error){
      alert(error);
    }  else {
      console.log('Success');
      console.log(result)
    }
  })
  
  // var linkedFile = Files.findOne(itemID);
  // //linkedFile=Files.findOne();
  // console.log("FILE")
  // console.log(linkedFile);
  // console.log(linkedFile.url());
  //
  // if (linkedFile != undefined)
  // {
  //   linkedFile.itemname=itemTitle;
  // }
  // return linkedFile;
  //return itemType.toLowerCase() + ".view";
})

Template.registerHelper('pathName', function(itemType) {
  return itemType.toLowerCase() + ".view";
});
