function decode(text) {
  var encoded = text;
  return decodeURIComponent(encoded.replace(/\+/g,  " "));
}


Template.searchPage.onCreated( function() {
  this.currentTab = new ReactiveVar( "all" );
//
});

Template.searchPage.onRendered(function(){
  $('.menu .item')
  .tab({
  });
  var url=window.location.href;
  var urlArray=url.split('/');
  var searchText=urlArray[urlArray.length-1];
  //console.log(searchText);
  if (searchText=="search")
  {
    console.log('search page');
    Session.set('searchText',"");
  }
  else
  {
    //console.log('search string:');
    var searchText=decode(searchText);
    Session.set('searchText',searchText)
    //console.log(searchText);
    $('#search-box').val(searchText);
    $("#search-box").keyup();
  }
})

Template.searchPage.helpers({
tab: function() {
    return Template.instance().currentTab.get();
  },
tabData: function() {
  console.log( Session.get("searchText"))
  var data = [];

  Meteor.subscribe("activities-searchpage-data", Session.get("searchText"));
  if (Session.get("searchText")) {
    data = Activities.find({}, { sort: [["score", "desc"]] });
  } else {
    data = Activities.find({});
  }

  Meteor.subscribe("resources-searchpage-data", Session.get("searchText"));
  if (Session.get("searchText")) {
    _.union(data,Resources.find({}, { sort: [["score", "desc"]] }).fetch());
  } else {
    _.union(data, Resources.find({}).fetch());
  }

  Meteor.subscribe("curricula-searchpage-data", Session.get("searchText"));
  if (Session.get("searchText")) {
    _.union(data, Curricula.find({}, { sort: [["score", "desc"]] }).fetch());
  } else {
    _.union(data,Curricula.find({}).fetch());
  }

    // var searchString = Session.get('searchText');
    var tab = Template.instance().currentTab.get();
    // var data =  Modules.client.searchItems( {searchString: searchString} );
    //
    // console.log(data[tab])
    var numResults = (data.count());
    console.log(numResults)
    //
    return {contentType: tab, numResults: numResults, items: data};
  }

})

Template.searchPage.events({
    "keyup #search-box": _.throttle(function(e) {
      var text="";
      if($(e.target).val()==undefined)
      {
          text = "";
      }
      else
      {
        text = $(e.target).val().trim();
      }

    Session.set('searchText',text);
    // console.log(data[tab][0]);
  // fileSearch.search(text);
  // console.log(this.name)
    //if nothing is returned
  //   if(fileSearch.getData()==""){
  //     //compute fuzzy search (look for closest match)

  //     fileSearch.cleanHistory();
  //     fileSearch.search(bestName+bestDescription);
  //   }
  //   else{
  //   console.log("FOUND");
  // }
  }, 200),

    'click .item': function(event,template){
      var currentTab=($( event.target ).attr("data-tab"));
      var currentTabStatus=$( event.target );
      currentTabStatus.addClass( "active" );
      $( ".menu a" ).not( currentTabStatus ).removeClass( "active" );
      template.currentTab.set(currentTab);
    },
    //USER CLICKS ON ITEM IN SEARCH RESULTS:
    'click #itemName': function (event) {
      var item = this;

//       var itemKeywords=item.keywords;
//       var itemDescription=item.description;
//       $form=$('.ui.form');
//       var keywords=itemKeywords;//.join()
//       Session.set('resourceDetailsID',item._id);
//       $('.ui.viewItem.modal')
//         .modal({
//           onDeny    : function(){
//           return true;
//           },
//           onApprove : function() {
//             var keywordsVar=$form.form('get value', 'keywords');
//             var descriptionVar=$form.form('get value', 'description');
//             var array=keywordsVar.split(',');
//             var resourceDetailsID=Session.get('resourceDetailsID');
//             Resources.update(item._id,{$set: {"keywords":array,"description":descriptionVar}});
//             return true;
//         }
//         })
//       .modal('show')
//       ;
//       $('.ui.form')
//   .form({
//     fields: {
//       name: {
//         identifier: 'keywords',
//         rules: [
//           {
//             type   : 'empty',
//             prompt : 'Please enter keywords'
//           }
//         ]
//       },
//       skills: {
//         identifier: 'description',
//         rules: [
//           {
//             type   : 'empty',
//             prompt : 'Please enter description'
//           }
//         ]
//       }
//     }
//   })
// ;
    },
     'submit .keyword-form': function(event,template){
        event.preventDefault();
    }
    ,
     'submit .description-form': function(event,template){
        event.preventDefault();
    }
  });
