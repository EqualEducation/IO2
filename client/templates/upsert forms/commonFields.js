Template.commonFields.onRendered(function() {
  $('.commonFields.noAdditions.ui.dropdown')
    .dropdown()
  ;

  $('.commonFields.allowAdditions.ui.dropdown')
    .dropdown({
      allowAdditions: true
    })
  ;
  
  $('.ui.radio.checkbox')
    .checkbox()
  ;
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

Template.materialsField.onRendered(function() {
  $('.ui.radio.checkbox')
    .checkbox()
  ;
})
