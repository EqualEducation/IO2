Template.viewItemContent.helpers({
  file: function(itemID) {
    //var linkedFile=YourFileCollection.find(itemID).fetch();
    console.log(itemID)
    var linkedFile=YourFileCollection.findOne(itemID);
    console.log("FILE")
    console.log(linkedFile)
    return linkedFile;
    //return itemType.toLowerCase() + ".view";
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
