Template.content.helpers({
    testLink: function() {
    //look in YourFile collection
    var details = YourFileCollection.findOne(this.fileId);
    return {
      URL: details.url,
      name: this.name,
      type: details.original.type,
      isUploaded: details.original.updatedAt,
      details:details,
      keywords: this.keywords,
      description:this.description,
      _id:details._id
    };

  },
    getFiles: function() {
    return fileSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")//makes text bold
      },
      sort: {name: 1}
    })
  }
})
