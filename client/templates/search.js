Meteor.subscribe("fileUploads");
  Meteor.subscribe("fileMeta");
//debugger;
Template.search.helpers({
  fileIndex: () => fileIndex,//, // instanceof EasySearch.Index

  testLink: function() {
    //look in YourFile collection
    var details = YourFileCollection.findOne(this.fileId)

    return details;
  },
  myAttributes: function() {
  return {
     placeholder: "Search here"
  };
}
// ,
// myCollection: function() {
//   return YourFileCollection;
// }

})
//   inputAttributes: function () {
