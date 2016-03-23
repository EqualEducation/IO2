Template.editCurriculum.onRendered( function() {
	$('#curriculumDetailsForm')
  .form({
    fields: {
      title     : 'empty',
      mainTopic   : 'empty',
      subTopic : 'empty',
      description : ['minLength[6]', 'empty'],
      keywords   : ['minCount[1]', 'empty'],
      audience    : 'empty'
    }
  })
	.form('set values', {
    title     : this.data.details.title,
		description     : this.data.details.description,
    mainTopic   : this.data.details.mainTopic,
    subTopic   : this.data.details.subTopic,
    keywords : this.data.details.keywords,
    audience : this.data.details.audience,
    source    : this.data.details.source,
		method    : this.data.method,
		books    : this.data.books,
		films    : this.data.films
  })
;
})
