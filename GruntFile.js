module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['<%=pkg.distDir%>']
    },

    less: {
      styles: {
        expand: true,
        cwd:    '<%=pkg.srcDir%>',
        src:    '*.less',
        dest:   '<%=pkg.distDir%>',  
        ext:    '.css'
      }
    },

    applyTemplate: {
      templateFile: '<%=pkg.srcDir%>/resume-template.hbs',
      dataFile: '<%=pkg.srcDir%>/resume-data.json',
      outputFile: '<%=pkg.distDir%>/resume.html'
    },

    watch: {
      css: {
        files: '<%=pkg.srcDir%>/*.less',
        tasks: ['less:styles'],
      },
      template: {
        files: ['<%=pkg.srcDir%>/*.hbs', '<%=pkg.srcDir%>/*.json'],
        tasks: ['applyTemplate'],
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('applyTemplate', 'Applies the handlebars template and produces the resulting HTML file', function() {

    // require config options
    this.requiresConfig('applyTemplate.templateFile');
    this.requiresConfig('applyTemplate.dataFile');
    this.requiresConfig('applyTemplate.outputFile');

    // get files from config
    var templateFile = grunt.config.get('applyTemplate.templateFile');
    var dataFile = grunt.option('dataFile') || grunt.config.get('applyTemplate.dataFile');
    var outputFile = grunt.config.get('applyTemplate.outputFile');

    // require dependencies
    var fs = require('fs');
    Handlebars = require('handlebars');

    // compile the template
    var template = Handlebars.compile( grunt.file.read(templateFile) );

    // apply the template
    grunt.file.write( outputFile, template( grunt.file.readJSON(dataFile) ) );
  });

  grunt.registerTask('build', ['less:styles', 'applyTemplate'])

  // Default task(s).
  grunt.registerTask('default', ['clean:dist', 'build', 'watch']);

};