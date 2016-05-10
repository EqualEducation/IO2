Template.viewItemContent.onRendered(function() {


})

Template.registerHelper('getFileDetails',function(itemID,itemTitle) {
  console.log('retreivingFileDetails for FileID: ' + itemID);
  var linkedFile = Files.findOne(itemID);
  return linkedFile;
})

Template.registerHelper('pathName', function(itemType) {
  return itemType.toLowerCase() + ".view";
});
