Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
  fileSearch.search(text);
  }, 200)
})
//comment
