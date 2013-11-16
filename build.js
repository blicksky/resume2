(function(){
	var fs = require('fs');
	
	var templateString = fs.readFileSync('src/resume-template.handlebars', {encoding: 'utf8'});
	var data = JSON.parse( fs.readFileSync('src/resume-data.json', {encoding: 'utf8'}) );
	
	Handlebars = require('handlebars');

	var template = Handlebars.compile( templateString );
	
	fs.writeFileSync( 'out.html', template( data ) );
	
})();