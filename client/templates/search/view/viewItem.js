Template.viewItem.onRendered(function () {
  $('.ui.dropdown')
.dropdown({
  allowAdditions: true
})
;


  // $("#deleteFile").click(function(){
  //   //var fsId= Session.get('fileDetailsID');
  //     var fileDetailsId=Session.get('fileDetailsID');
  //     var file=fileDetails.findOne({_id:Session.get('fileDetailsID')});
  //     YourFileCollection.remove({_id: file.fileId});
  //     fileDetails.remove({_id:fileDetailsId});
  //     Session.set('fileSearch',fileSearch.getData());
  //     fileSearch.cleanHistory();
  //     fileSearch.search("");
  //     //MAKE THE MODAL CLOSE!
  //     $('.ui.editResource.modal').modal("hide");
  // })
});

// Template.viewItem.helpers({
//   item: function() {
//     if(Session.get('resourceDetailsID')===undefined){
//       return 0;
//     }
//     else{
//       //change this to return any item
//       //console.log(Session.get('resourceDetailsID'));
//       var item=Resources.findOne({_id:Session.get('resourceDetailsID')});
//       if(item===undefined){
//         item=Activities.findOne({_id:Session.get('resourceDetailsID')});
//       }
//       if(item===undefined){
//         item=Curricula.findOne({_id:Session.get('resourceDetailsID')});
//       }
//       // console.log(Session.get('resourceDetailsID'));
//       // console.log(resource);
//       var file = null;
//       var fileURL = null;
//       // if (resource.fileIDs != undefined) {
//       //   file = YourFileCollection.findOne(resource.fileIDs);
//       //   fileURL = file.url;
//       // }
//       console.log("URL")
//       console.log(fileURL)
//       return {
//         file:file,
//         URL: fileURL,
//         name: item.details.title,
//         keywords: item.details.keywords,
//         description:item.details.description,
//         itemType: item.itemType,
//         title: item.details.title,
//         mainTopic: item.details.mainTopic,
//         subTopic: item.details.subTopic,
//         duration:item.details.duration,
//         source:item.details.source,
//         audience:item.details.audience,
//         method:item.details.method
//         //_id:details._id
//       };
//   }
//   }
// })
