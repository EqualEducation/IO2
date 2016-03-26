Template.viewItem.onRendered(function () {
  $('.ui.dropdown')
.dropdown({
  allowAdditions: true
})
;
});
// Template.viewItem.events({
//   'click #downloadPDF2': function (event) {
//     var doc = new jsPDF();

// // We'll make our own renderer to skip this editor
// var specialElementHandlers = {
//   '#editor': function(element, renderer){
//     return true;
//   }
// };

// // All units are in the set measurement for the document
// // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
// doc.fromHTML($('body').get(0), 15, 15, {
//   'width': 170,
//   'elementHandlers': specialElementHandlers
// });
// var pdf = new jsPDF('p','pt','a4');

// pdf.addHTML(document.body,function() {
//   var string = pdf.output('datauristring');
//   $('.preview-pane').attr('src', string);
// });
// pdf.save('Test.pdf');
//   }
// });

