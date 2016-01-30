Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
  fileSearch.search(text);
  // console.log(this.name)
    //if nothing is returned
  //   if(fileSearch.getData()==""){
  //     //compute fuzzy search (look for closest match)
  //     var tempCursor = fileDetails.find({}, { name: true ,description:true});
  //     var bestName = mostSimilarString(tempCursor, "name", text, -1, false);
  //     console.log('did you mean');
  //     var bestDescription = mostSimilarString(tempCursor, "description", text, -1, false);
  //     console.log(bestName+", "+bestDescription);
  //     fileSearch.cleanHistory();
  //     fileSearch.search(bestName+bestDescription);
  //   }
  //   else{
  //   console.log("FOUND");
  // }
  }, 200)
})
