resume2
=======

I haven't significantly updated my resume since it was acceptable to use HTML tables for layout (::shudder::), so this project is aimed at creating a new resume built using modern technologies such as HTML5 and CSS3. To build it, I'm using handlebars, less, and grunt.

**For development:**

This will watch for changes to the less files, the handlebars template file, or the example data file.
```shell
grunt
```

**To build using the example data file:**
```shell
grunt applyTemplate
```

**To build using another data file:**
```shell
grunt applyTemplate --dataFile=/path/to/data/file
```
