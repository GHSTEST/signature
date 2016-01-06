// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

      
    watch: {
        // for stylesheets, watch css and less files 
        // only run less and cssmin 
        stylesheets: { 
          files: ['grunt/src/*/*.css', 'src/*/*.less'], 
          tasks: ['less:dev', 'cssmin:dev']
        },
        scripts: { 
            files: ['grunt/src/*/*.js'],
            tasks: ['jshint:dev', 'uglify:dev'] 
        }
    },
   
      
     // configure jshint to validate js files -----------------------------------
    jshint: {
          options: {
            reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
          },

          // when this task is run, lint the Gruntfile and all js files in src
          build: ['Gruntfile.js', 'grunt/src/**/*.js'],
          dev: ['Gruntfile.js', 'grunt/src/**/*.js'],
          production: ['Gruntfile.js', 'grunt/src/**/*.js']
    },
      

    // configure uglify to minify js files -------------------------------------
    uglify: {
          options: {
            banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
          },
          build: {
            files: {
             // 'dist/js/magic.min.js': ['src/js/magic.js','src/js/magic2.js' ]
                'public/js/magic.min.js': 'grunt/src/**/*.js'
            }
          },
          dev: { 
            files: { 'grunt/dist/js/magic.min.js': ['grunt/src/js/magic.js', 'grunt/src/js/magic2.js'] } 
            }, 
          production: { 
            files: { 'grunt/dist/js/magic.min.js': 'grunt/src/**/*.js' } 
          } 
      },
      
      
    // compile less stylesheets to css -----------------------------------------
    less: {
      build: {
        files: {
          'grunt/dist/css/pretty.css': 'grunt/src/css/pretty.less'
        }
      },
       dev: {
        files: {
          'grunt/dist/css/pretty.css': 'grunt/src/css/pretty.less'
        }
      },
      production: {
        files: {
          'grunt/dist/css/pretty.css': 'grunt/src/css/pretty.less'
        }
      },
    },
      
    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'grunt/dist/css/style.min.css': 'grunt/src/css/style.css'
        }
      },
      dev: {
        files: {
          'grunt/dist/css/style.min.css': 'grunt/src/css/style.css'
        }
      },
      production: {
        files: {
          'grunt/dist/css/style.min.css': 'grunt/src/css/style.css'
        }
      }
    }

  });
    
  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

    // ============= // CREATE TASKS ========== //

    // this default task will go through all configuration (dev and production) in each task 
  grunt.registerTask('default', ['jshint:build', 'uglify:build', 'cssmin:build', 'less:build']);

  // this task will only run the dev configuration 
  grunt.registerTask('dev', ['jshint:dev', 'uglify:dev', 'cssmin:dev', 'less:dev']);

  // only run production configuration 
  grunt.registerTask('production', ['jshint:production', 'uglify:production', 'cssmin:production', 'less:production']);

    
};

