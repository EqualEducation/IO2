SearchSource.defineSource('filesToSearch', function(searchText, options) {
  var options = {sort: {name: 1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {name: regExp},
      {description: regExp},
      {keywords: regExp}
    ]};
    //handle fuzzy logic here! if any files are found:
    // if(fileDetails.find(selector,options).count()==0)
    // {
    //   //return closest match!
    // var tempCursor = fileDetails.find({}, { name: true });
    // //var bestWord = mostSimilarString(tempCursor, "name", regExp, -1, false);
    // //console.log('did you mean');
    // //console.log(bestWord);
    // return fileDetails.find({}, options).fetch();
    // }
    // else
    // {
    // return fileDetails.find(selector, options).fetch();
    // }
    return fileDetails.find(selector, options).fetch();
  } else {
    return fileDetails.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
