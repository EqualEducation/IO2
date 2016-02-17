Template.resourceDetail.onRendered(function () {

  $('.ui.dropdown')
  .dropdown({
    allowAdditions: true
  })
;


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
      $('.ui.resourceDetail.modal').modal("hide");
  })
});

Template.resourceDetail.helpers({
  resource: function() {
    if(Session.get('resourceDetailsID')===undefined){
      return 0;
    }
    else{
      //var file=fileDetails.findOne({_id:Session.get('fileDetailsID')});
      //
      var resource=Resources.findOne({_id:Session.get('resourceDetailsID')});
      var file = YourFileCollection.findOne(resource.fileIDs);
      // console.log(resource);
      // console.log("file")
      // console.log(details);
      // console.log(details.url)
      // console.log(resource);
      return {
        file:file,
        URL: file.url,
        name: resource.details.title,
        keywords: resource.details.keywords,
        description:resource.details.description
        //_id:details._id
      };
  }
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
