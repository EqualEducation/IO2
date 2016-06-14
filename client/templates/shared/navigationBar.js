Template.navigationBar.events({
  'click .item': function(event,template){
    var currentTabStatus=$( event.target);
    currentTabStatus.addClass( "active" );
    $( "a" ).not( currentTabStatus ).removeClass( "active" );

    analytics.track("Navigation tapped", {
        "ID": currentTabStatus[0].id
    });
  },
})
