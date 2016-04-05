// Template.footer.onRendered(function() {
//   // .ui.fixed.sticky + p {
//   //   margin-top: 39px;
//   // }
//
//   $('.ui.sticky')
//     .sticky({
//       // offset       : 0,
//       bottomOffset : 0,
//       context      : '#main'
//     })
//   ;
// });


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
