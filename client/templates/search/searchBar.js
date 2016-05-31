Template.searchBar.events({
    "click #searchButton": function(event, template) {
      var text="";
      if(template.find("#searchBox")==undefined)
      {
          text = "";
      }
      else
      {
        var searchBox = template.find("#searchBox");
        text = $(searchBox).val().trim();
      }

    Session.set('searchText', text);
  },
  'keypress input': function(event, template) {
    if (event.keyCode == 13) {
        event.stopPropagation();
        var text="";
        if(template.find("#searchBox")==undefined)
        {
            text = "";
        }
        else
        {
          var searchBox = template.find("#searchBox");
          text = $(searchBox).val().trim();
        }

      Session.set('searchText', text);
        return false;
    }
}
})
