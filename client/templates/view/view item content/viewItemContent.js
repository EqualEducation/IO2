Template.registerHelper('file',function(itemID,itemTitle) {
  var linkedFile=YourFileCollection.findOne(itemID);
  //linkedFile=YourFileCollection.findOne();
  console.log("FILE")
  console.log(linkedFile);
  console.log(linkedFile.url());

  if (linkedFile != undefined)
  {
    linkedFile.itemname=itemTitle;
  }
  return linkedFile;
  //return itemType.toLowerCase() + ".view";
})

Template.registerHelper('pathName', function(itemType) {
  return itemType.toLowerCase() + ".view";
});
