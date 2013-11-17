(function(){
	
	var fs = require('fs');

	var copy = function(from, to) {
		fs.createReadStream(from).pipe(fs.createWriteStream(to));
	}
	
	var templateString = fs.readFileSync('src/resume-template.hbs', {encoding: 'utf8'});
	var data = JSON.parse( fs.readFileSync('src/resume-data.json', {encoding: 'utf8'}) );
	
	Handlebars = require('handlebars');

	var template = Handlebars.compile( templateString );
	
	if( !fs.existsSync('build') ) {
		fs.mkdirSync('build');
	}

	fs.writeFileSync( 'build/resume.html', template( data ) );
	copy('src/styles.css', 'build/styles.css');
	copy('src/styles-print.css', 'build/styles-print.css');
	
})();