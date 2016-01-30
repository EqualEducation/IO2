
Template.fileList.onCreated( function() {
  this.currentTab = new ReactiveVar( "all" );
});

Template.fileList.onRendered(function(){
  $('.menu .item')
  .tab({
  })
;
})
Template.fileList.helpers({
tab: function() {
  console.log('tab');
  console.log(Template.instance().currentTab.get());
    return Template.instance().currentTab.get();
  },
  tabData: function() {
    var tab = Template.instance().currentTab.get();
    console.log(tab);
 var data = {
     "all": [
     fileDetails.find().fetch(),
        // { "name": "Seeking Wisdom: From Darwin to Munger", "description": "Peter Bevelin" }
      ],
      "activities": [
        fileDetails.find().fetch(),
      ],
      "readings": [
      fileDetails.find().fetch(),
      ],
      "curriculums": [
        fileDetails.find().fetch(),
      ],
      "books": [
        fileDetails.find().fetch(),
      ],
      "films": [
        fileDetails.find().fetch(),
      ],
      "other": [
        fileDetails.find().fetch(),
      ]
    };
    console.log(data[tab])
    console.log(data[tab][0])
     return { contentType: tab, items: data[ tab ][0] };
  }

})
Template.fileList.events({
    'click .item': function(event,template){
      var currentTab=($( event.target ).attr("data-tab"));
      template.currentTab.set(currentTab);
    },
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
