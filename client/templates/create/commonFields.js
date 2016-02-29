Template.commonFields.onRendered(function() {
  console.log('RENDERING')
  console.log($('.commonFields.allowAdditions.ui.dropdown'))
  console.log($('.commonFields.noAdditions.ui.dropdown'))

  $('.commonFields.noAdditions.ui.dropdown')
    .dropdown()
  ;

  $('.commonFields.allowAdditions.ui.dropdown')
    .dropdown({
      allowAdditions: true
    })
  ;

  // $('.keywords.ui.dropdown')
  //   .dropdown({
  //     allowAdditions: true
  //   })
  // ;
})

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
