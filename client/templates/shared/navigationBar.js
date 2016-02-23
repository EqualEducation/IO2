Template.navigationBar.events({
  'click .item': function(event,template){
    console.log('navigation bar');
    var currentTabStatus=$( event.target);
    currentTabStatus.addClass( "active" );
    $( "a" ).not( currentTabStatus ).removeClass( "active" );
  },
})
