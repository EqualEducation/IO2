Template.activityDetail.onRendered(function () {
  $("#deleteFile").click(function(){
    //var fsId= Session.get('fileDetailsID');
      var fileDetailsId=Session.get('fileDetailsID');
      var file=fileDetails.findOne({_id:Session.get('fileDetailsID')});
      YourFileCollection.remove({_id: file.fileId});
      fileDetails.remove({_id:fileDetailsId});
      Session.set('fileSearch',fileSearch.getData());
      fileSearch.cleanHistory();
      fileSearch.search("");
      //MAKE THE MODAL CLOSE!
      $('.ui.activitydetail.modal').modal("hide");
  })
  // console.log('here');
  // $('.ui.fluid.search.dropdown')
  //   .dropdown()
  // ;
});
// Template.activityDetail.events({
//     'click #deleteFile': function (event) {
//       console.log('here');
//       // var fsId= this._id;
//       // var fileDetailsId=fileDetails.findOne({fileId:fsId})._id;
//       // YourFileCollection.remove({_id: this._id});
//       // fileDetails.remove({_id:fileDetailsId});
//       // Session.set('fileSearch',fileSearch.getData());
//       // fileSearch.cleanHistory();
//       // fileSearch.search("");
//     }
//   });
Template.activityDetail.helpers({
  activity: function() {
    var file=fileDetails.findOne({_id:Session.get('fileDetailsID')});
    var details = YourFileCollection.findOne(file.fileId);
    return {
      URL: details.url,
      name: file.name,
      type: details.original.type,
      isUploaded: details.original.updatedAt,
      details:details,
      keywords: file.keywords,
      description:file.description,
      _id:details._id
    };
  },
  uniqueKeywords: function(){
//return all unique keywords (ignores blanks)
return _.uniq(_.flatten(fileDetails.find({keywords:{$not:""}}, {
    sort: {keywords: 1}, fields: {keywords: true}
}).fetch().map(function(x) {
    return x.keywords;
}), true)).sort();
  }
})


