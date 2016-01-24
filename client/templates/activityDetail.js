Template.activityDetail.helpers({
  activity: function() {
    var file=fileDetails.findOne({_id:Session.get('fileDetailsID')});
    //var details = YourFileCollection.findOne(file.fileId);
    return file
  },
  uniqueKeywords: function(){
//return all unique keywords (ignores blanks)
return _.uniq(_.flatten(fileDetails.find({keywords:{$not:""}}, {
    sort: {keywords: 1}, fields: {keywords: true}
}).fetch().map(function(x) {
    return x.keywords;
}), true)).sort();


  }
})


