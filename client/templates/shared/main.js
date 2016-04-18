Tracker.autorun(function () {
  var current = Router.current();
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
});

Template.registerHelper("print", function (data) {
  console.log("data: ");
  console.log(data);
});

Template.registerHelper("curriculumEnum", function () {
  return ItemTypeEnum.CURRICULUM
});

Template.registerHelper("activityEnum", function () {
  return ItemTypeEnum.ACTIVITY
});

Template.registerHelper("resourceEnum", function () {
  return ItemTypeEnum.RESOURCE
});

Template.registerHelper('isEqual', function(obj1, obj2) {
  return obj1 == obj2;
})

Template.registerHelper('exists', function(obj) {
  return obj != undefined && obj != null;
})

Template.registerHelper('resourceDisplayName', function(resourceType) {
  var resourceDisplayName;
  switch (resourceType) {
      case "book":
        resourceDisplayName = "Book"
        break;
      case "video":
        resourceDisplayName = "Video"
        break;
      case "icebreaker":
        resourceDisplayName = "Ice Breaker"
        break;
      case "other":
        resourceDisplayName = "Other"
        break;
      case "shortreading":
        resourceDisplayName = "Short Reading"
        break;
      default:
        resourceDisplayName = "Other"
    }
    return resourceDisplayName;
  })

Template.registerHelper('contentDisplayName', function(contentType) {
  var contentDisplayName;
  switch (contentType) {
      case "book":
        contentDisplayName = "Books"
        break;
      case "video":
        contentDisplayName = "Videos"
        break;
      case "icebreaker":
        contentDisplayName = "Icebreakers"
        break;
      case "other":
        contentDisplayName = "Other"
        break;
      case "shortreading":
        contentDisplayName = "Short Readings"
        break;
      case "activities":
        contentDisplayName = "Activities"
        break;
      case "resources":
        contentDisplayName = "Resources"
        break;
      case "curricula":
        contentDisplayName = "Curricula"
        break;
      case "allResources":
        contentDisplayName = "All Resources"
        break;
      default:
        contentDisplayName = "All"
    }
    return contentDisplayName;
  })

Template.registerHelper('getOptions', function(optionType) {
	var optionsInstance = this.options;
	var options;
	if (optionsInstance == undefined) {
    console.log('resettings options');
		var items = Options.findOne();
		this.options = new ReactiveVar(items);
		options = this.options.get();
	} else {
    console.log('existing options');
		options = optionsInstance.get();
	}
  console.log(options)
	console.log('Get options for type: '  + optionType)
	console.log(options[optionType])
  return options[optionType];
})

Template.registerHelper('isChecked', function(value) {
    if (value == "on") {
      return "Yes";
    } else if (value == false) {
      return "No";
    } else {
      return "Unknown";
    }
})
