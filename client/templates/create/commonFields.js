Template.commonFields.helpers({
  'topics' : function() {
    var items = MainTopics.find({});
    return items;
  },
  'subTopics' : function() {
    var items = SubTopics.find({});
    return items;
  },
  'keywords' : function() {
    var items = Keywords.find({});
    return items;
  },
  'audiences' : function() {
    var items = Audiences.find({});
    return items;
  },
})

Template.methodField.helpers({
  'methods' : function() {
    var items = Methods.find({});
    return items;
  }
})
