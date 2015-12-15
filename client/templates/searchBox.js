Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    fileSearch.search(text);
    if(fileSearch.getData()==""){
      var tempCursor = fileDetails.find({}, { name: true ,description:true});
      var bestName = mostSimilarString(tempCursor, "name", text, -1, false);
      console.log('did you mean');
      var bestDescription = mostSimilarString(tempCursor, "description", text, -1, false);
      console.log(bestName+", "+bestDescription);
      //why doesnt this work?
      //fileSearch.cleanHistory();
      //fileSearch.search(bestName);
    }
    else{
    console.log("FOUND");
  }
  }, 200)
})
