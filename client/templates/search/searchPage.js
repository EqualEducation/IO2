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
    // console.log( Session.get("searchText"))
    // console.log(this)
    var currentTab = Template.instance().currentTab.get();
    // if (currentTab == tab) {
      var data =  Modules.client.searchItems( {searchString: Session.get("searchText"), tab: currentTab} );
      var numResults = data.length;
      return {contentType: currentTab, numResults: numResults, items: data};
    // }
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

    // console.log('KEY UP')
    Session.set('searchText',text);
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
    },
     'submit .keyword-form': function(event,template){
        event.preventDefault();
    }
    ,
     'submit .description-form': function(event,template){
        event.preventDefault();
    }
  });
