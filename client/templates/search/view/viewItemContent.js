Template.viewItemContent.helpers({
  file: function(itemID) {
    var linkedFile=YourFileCollection.findOne(itemID);
    //linkedFile=YourFileCollection.findOne();
    console.log("FILE")
    console.log(linkedFile)
    return linkedFile;
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
