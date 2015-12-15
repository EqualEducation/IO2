SearchSource.defineSource('filesToSearch', function(searchText, options) {
  var options = {sort: {name: 1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var containsColon=regExp.toString().indexOf(":");
    var containsName=regExp.toString().indexOf("name");
    var containsDescription=regExp.toString().indexOf("description");
    var containsKeywords=regExp.toString().indexOf("keyword");
    var selector=null;
    if(containsColon<0)
    {
    selector = {$or: [
      {name: regExp},
      {description: regExp},
      {keywords: regExp}
    ]};
  }
  //if they have entered a colon
  else
  {
    var stringLength=regExp.toString().length;
    var searchKey=regExp.toString().substring(containsColon+1,stringLength-4);
    var regExpSearchKey=buildRegExp(searchKey);
    if(containsName>0)
    {
    selector={name: regExpSearchKey};
    }
    if(containsDescription>0)
    {
    selector={description: regExpSearchKey};
    }
    if(containsKeywords>0)
    {
    selector={keywords: regExpSearchKey};
    }
  }
    return fileDetails.find(selector, options).fetch();
  }
//if nothing in search - return everything
  else {
    return fileDetails.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-]+/);
  //define regExp with flags (case insensitive + global search)
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
