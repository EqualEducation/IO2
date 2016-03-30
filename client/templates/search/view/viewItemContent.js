Template.viewItemContent.helpers({
  file: function(itemID,itemTitle) {

    var linkedFile=YourFileCollection.findOne(itemID);
    //linkedFile=YourFileCollection.findOne();
    console.log("FILE")
    console.log(linkedFile);
    if (linkedFile != undefined)
    {
      linkedFile.itemname=itemTitle;
    }
    return linkedFile;

    //return itemType.toLowerCase() + ".view";
  },
  isActivity: function(itemType) {
    if(itemType=="Activity")
      return true;
    else
      return false;

  },
    isBook: function(itemType) {
    if(itemType=="book")
      return true;
    else
      return false;

  },
  isVideo: function(itemType) {
    if(itemType=="film")
      return true;
    else
      return false;

  },
  isIcebreaker: function(itemType) {
    if(itemType=="icebreaker")
      return true;
    else
      return false;

  },
  resource: function(resourceID) {

    var resource=Resources.findOne(resourceID);
    //linkedFile=YourFileCollection.findOne();
    console.log("RESOURCE")
    console.log(resource)
    return resource;

    //return itemType.toLowerCase() + ".view";
  },
  editURL: function(item) {
    var url;
    switch (item.itemType) {
      case ItemTypeEnum.ACTIVITY:
        url = '\\activity\\edit\\' + item._id;
        break;
      case ItemTypeEnum.RESOURCE:
        url = '\\resource\\edit\\' + item._id;
        break;
      case ItemTypeEnum.CURRICULUM:
        url = '\\curriculum\\edit\\' + item._id;
        break;
      default:
        break;
    }

    return url;
  }
})


Template.viewItemContent.events({
    'click #deleteFile': function (event) {
      //console.log(this);
      itemID=(this.item._id)
      itemType=(this.item.itemType)
      $('.ui.basic.test.modal')
        .modal({

          onDeny    : function(){
            return true;
          },
          onApprove : function() {
                  Meteor.call("deleteItem",itemType,itemID)
                  window.location = "/search";
          }
        })
        .modal('show')
      ;
    }
    // },
    // 'click #downloadFile': function (event) {
    //   console.log("DOWNLOAD");
    //   console.log(this);
    // }
    });
