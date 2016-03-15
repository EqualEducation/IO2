Template.editItemContent.helpers({
  resource: function() {
    if(Session.get('resourceDetailsID')===undefined){
      return 0;
    }
    else{
      //console.log('edit session id')
      //co/nsole.log(Session.get('resourceDetailsID'));
      var item=Resources.findOne({_id:Session.get('resourceDetailsID')});
      if(item===undefined){
        item=Activities.findOne({_id:Session.get('resourceDetailsID')});
      }
      if(item===undefined){
        item=Curricula.findOne({_id:Session.get('resourceDetailsID')});
      }
            console.log('sessionID2');
      console.log(Session.get('resourceDetailsID'));
      // console.log(Session.get('resourceDetailsID'));
      // console.log(resource);
      var file = null;
      var fileURL = null;
      console.log(item)
      console.log(item.itemType);
      // if (resource.fileIDs != undefined) {
      //   file = YourFileCollection.findOne(resource.fileIDs);
      //   fileURL = file.url;
      // }
      return {
        file:file,
        URL: fileURL,
        name: item.details.title,
        keywords: item.details.keywords,
        description:item.details.description,
        itemType: item.itemType,
        title: item.details.title,
        mainTopic: item.details.mainTopic,
        subTopic: item.details.subTopic,
        duration:item.details.duration,
        source:item.details.source,
        audience:item.details.audience,
        method:item.details.method
        //_id:details._id
      };
  }
  }
})
