
Template.activityDetail.onRendered(function () {
  $('.ui.search.dropdown')
    .dropdown()
  ;
});

Template.activityDetail.helpers({
  activity: function() {
    var file=fileDetails.findOne({_id:Session.get('fileDetailsID')});
    var details = YourFileCollection.findOne(file.fileId);
    console.log(details);
    return {
      URL: details.url,
      name: file.name,
      type: details.original.type,
      isUploaded: details.original.updatedAt,
      details:details,
      keywords: file.keywords,
      description:file.description,
      _id:details._id
    };
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
