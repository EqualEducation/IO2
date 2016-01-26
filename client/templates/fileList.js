
Template.fileList.onRendered(function(){
  $('.menu .item')
  .tab({
  })
;
})
Template.fileList.events({

    // 'click #deleteFileButton ': function (event) {
    //   console.log('here');
    //   var fsId= this._id;
    //   var fileDetailsId=fileDetails.findOne({fileId:fsId})._id;
    //   YourFileCollection.remove({_id: this._id});
    //   fileDetails.remove({_id:fileDetailsId});
    //   Session.set('fileSearch',fileSearch.getData());
    //   fileSearch.cleanHistory();
    //   fileSearch.search("");
    // },
    'click #resourceName': function (event) {
      var fsId= this._id;
      var fileDetailsID=fileDetails.findOne({fileId:fsId})._id;
      var fileDetailsName=fileDetails.findOne({fileId:fsId}).name;
      var fileDetailsKeywords=fileDetails.findOne({fileId:fsId}).keywords;
      var fileDetailsDescription=fileDetails.findOne({fileId:fsId}).description;
      var description=fileDetailsDescription;
      $form=$('.ui.form');
      //$form.form('set value', 'description',description);
      //document.getElementById("description").value = description;
      var keywords=fileDetailsKeywords.join()
      //document.getElementById("keywords").value = keywords;
      //$form.form('set value', 'keywords',keywords);
      Session.set('fileDetailsID',fileDetailsID);
      Session.set('fileSearch',fileSearch.getData());
      $('.ui.activitydetail.modal')
        .modal({
          onDeny    : function(){
          return true;
          },
          onApprove : function() {
            var keywordsVar=$form.form('get value', 'keywords');
            var descriptionVar=$form.form('get value', 'description');
            var array=keywordsVar.split(',');
            var fileDetailsID=Session.get('fileDetailsID');
            fileDetails.update(fileDetailsID,{$set: {"keywords":array,"description":descriptionVar}});
            Session.set('filesToReturn',fileSearch.getData());
            fileSearch.cleanHistory();
            fileSearch.search("");
            return true;
        }
        })
      .modal('show')
      ;
      $('.ui.form')
  .form({
    fields: {
      name: {
        identifier: 'keywords',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter keywords'
          }
        ]
      },
      skills: {
        identifier: 'description',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter description'
          }
        ]
      }
    }
  })
;
    },


    'change .your-upload-class': function (event, template) {
      console.log("uploading...")
      FS.Utility.eachFile(event, function (file) {
        console.log("each file...");
        var yourFile = new FS.File(file);
        console.log('yourfile')
        console.log(yourFile)
        YourFileCollection.insert(yourFile, function (err, fileObj) {
          console.log("callback for the insert, err: ", err);
          if (!err) {
            console.log("inserted without error",fileObj)
            var name = yourFile.original.name;
            var index=name.indexOf(".");
            var nameTrunc=name.substring(0,index);
            //console.log(nameTrunc)
            fileDetails.insert({name:nameTrunc,fileId:fileObj._id,keywords:[],type:yourFile.original.type,description:null});
            fileSearch.cleanHistory();
            fileSearch.search("");
            Session.set('filesToReturn',fileSearch.getData());
            console.log("REFRESH");
          }
          else {
            console.log("there was an error", err);
          }

        });
        //
      });
    },
     'submit .keyword-form': function(event,template){
        event.preventDefault();
    }
    ,
     'submit .description-form': function(event,template){
        event.preventDefault();
    }
    // ,
    // 'submit .search-form': function(event,template){
    //     event.preventDefault();
    //     var searchField=event.target.searchName.value;
    //     Session.set('searchField',searchField);
    // }
  });
