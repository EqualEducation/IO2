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
