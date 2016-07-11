Tracker.autorun(function () {
  var current = Router.current();
  Tracker.afterFlush(function () {
    $(window).scrollTop(0);
  });
});

Template.main.onRendered(function() {
  $('.ui.sticky')
  .sticky()
;

  $('#feedback')
  .popup({
    on: 'click',
    popup : $('#feedbackPopup'),
    preserve : true,
    closable: true
  })
})

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

var _resourceDisplayName = function(resourceType) {
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
}
Template.registerHelper('resourceDisplayName', function(resourceType) {
  return _resourceDisplayName(resourceType)
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

  Template.registerHelper('resourceIcon', function(resourceType) {
      var icon;
      switch (resourceType) {
        case "book":
          icon = "book"
          break;
        case "video":
          icon = "camera"
          break;
        case "icebreaker":
          icon = "flag"
          break;
        case "other":
          icon = "help"
          break;
        case "shortreading":
          icon = "file text outline"
          break;
        default:
          icon = "folder open outline"
      }
      return icon;
  })

Template.registerHelper('getOptions', function(optionType) {
	var optionsInstance = this.options;
	var options;
	if (optionsInstance == undefined) {
		var items = Options.findOne();
		this.options = new ReactiveVar(items);
		options = this.options.get();

	} else {
		options = optionsInstance.get();
	}
  return options[optionType];
})

Template.registerHelper('getSubOptions', function(superOption) {
  var superOptionType = Session.get(superOption)
	var optionsInstance = this.options;
	var options;
	if (optionsInstance == undefined) {
		var items = Options.findOne();
		this.options = new ReactiveVar(items);
		options = this.options.get();
	} else {
		options = optionsInstance.get();
	}
  return options[superOptionType];
})

Template.registerHelper('isChecked', function(value) {
    if (value == "on") {
      return "Yes";
    } else if (value == false) {
      return "No";
    } else {
      return "Unknown";
    }
});

Template.registerHelper('versionNumber', function() {
  var version = Version.findOne();
  console.log('VERSION NUMBER: ' + version.version);

  return version.version;
});

Template.main.events({
  'click #sendFeedback' : function(e, t) {
    e.preventDefault()
    let message = $("#feedbackMessage")[0].value
    let email = $("#feedbackEmail")[0].value

    $('#feedbackForm').trigger('reset');
    $('#feedback').popup('hide');

    if (message == undefined || message == "") {
      return;
    }

    alert('Thank you for your feedback!')
    console.log('sending email');
    Meteor.call('sendEmail',
          'activities@equaleducation.org.za',
          'carla@equaleducation.org.za',
          "EE Activities Database Feedback",
          emailBodyHtml(message, email));
    }
})

Handlebars.registerHelper('times', function(n, block) {
  console.log(n);
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

function emailBodyHtml(feedback, email)  {
  var emailBody = "<p>You have received feedback. Please see below.</p><p><i>" + feedback + "</i></p>"
  if (email != undefined && email != "") {
    emailBody = emailBody + "<p>From user: " + email + "</p>"
  }

  return emailBody;
}
