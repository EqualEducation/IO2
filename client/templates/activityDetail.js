Template.activityDetail.helpers({
  activityLink: function() {
    console.log('activity');
    console.log(this.fileId);
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

  }
})
