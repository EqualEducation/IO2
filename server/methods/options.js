Meteor.methods({
  addSubtopic: function(mainTopic, subtopic) {
    var loggedInUser = Meteor.user()

        if (!loggedInUser ||
            !Roles.userIsInRole(loggedInUser,
                                ['admin'])) {
          throw new Meteor.Error(403, "Access denied")
        }
        console.log("Add subtopic");

        console.log(mainTopic);
        console.log(subtopic);
        var options = Options.findOne();
        console.log(options.mainTopics);
        options[mainTopic].push(subtopic);
        Options.upsert(options._id, options);
  },
  addMainTopic: function(mainTopic) {
    var loggedInUser = Meteor.user()

        if (!loggedInUser ||
            !Roles.userIsInRole(loggedInUser,
                                ['admin'])) {
          throw new Meteor.Error(403, "Access denied")
        }

        console.log("Add main topic");
        var options = Options.findOne();
        console.log(mainTopic);
        options.mainTopics.push(mainTopic);        
        options[mainTopic] = ["General"];
        Options.upsert(options._id, options);
  }
})
