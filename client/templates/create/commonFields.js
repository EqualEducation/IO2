Template.commonFields.onCreated(function() {
  var items = Options.findOne();
  this.options = new ReactiveVar(items);


})

Template.commonFields.onRendered(function() {
  $('.commonFields.noAdditions.ui.dropdown')
    .dropdown()
  ;

  $('.commonFields.allowAdditions.ui.dropdown')
    .dropdown({
      allowAdditions: true
    })
  ;

  // console.log('MAIN TOPIC: ' + this.data.mainTopic)
  // $('#mainTopic').dropdown('set selected', this.data.mainTopic);
  // $('#subTopic').dropdown('set selected', this.data.subTopic);
  // $('#keywords').dropdown('set selected', this.data.keywords);
  // $('#audience').dropdown('set selected', this.data.audience);
  // $('#audience').dropdown('set selected', this.data.audience);

})

Template.methodField.onCreated(function() {
  var items = Options.findOne();
  console.log(items);
  this.options = new ReactiveVar(items);

})

Template.methodField.onRendered(function() {
  $('.commonFields.noAdditions.ui.dropdown')
    .dropdown()
  ;

  $('.commonFields.allowAdditions.ui.dropdown')
    .dropdown({
      allowAdditions: true
    })
  ;
})

Template.materialsField.onCreated(function() {
  var items = Options.findOne();
  this.options = new ReactiveVar(items);

})

Template.materialsField.onRendered(function() {
  $('.commonFields.noAdditions.ui.dropdown')
    .dropdown()
  ;

  $('.commonFields.allowAdditions.ui.dropdown')
    .dropdown({
      allowAdditions: true
    })
  ;
})

Template.commonFields.helpers({
  'topics' : function() {
    var options = Template.instance().options.get();
    return options.mainTopics;
  },
  'subTopics' : function() {
    var options = Template.instance().options.get();
    return options.subTopics;
  },
  'keywords' : function() {
    var options = Template.instance().options.get();
    return options.keywords;
  },
  'audiences' : function() {
    var options = Template.instance().options.get();
    return options.audiences;
  },
})

Template.methodField.helpers({
  'methods' : function() {
    var options = Template.instance().options.get();
    return options.methods;
  }
})

Template.materialsField.helpers({
  'materials' : function() {
    var options = Template.instance().options.get();
    return options.materials;
  }
})
