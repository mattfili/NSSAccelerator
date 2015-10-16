module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var randomPort = getRandomInt(3000,65536);

  grunt.initConfig({
  'gh-pages': {
    options: {
      base: 'public'
    },
    src: ['**']
    },
    pkg: grunt.file.readJSON('package.json'),
    autoprefixer: {
      main: {
        options: ['>1% in US'],
        src: 'public/css/main.css'
      }
    },
    babel: {
      dev: {
        options: {
          sourceMap: 'inline'
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'public/'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'public/'
          }
        ]
      }
    },
    bower_concat: {
      main: {
        dest: 'public/lib/build.js',
        cssDest: 'public/lib/build.css',
        dependencies: {
          'isotope': [
          "angular",
          "jquery",
          "angular-animate",
          "bootstrap",
          "angular-ui-router",
          "angular-resource",
          "typicons.font",
          "angularfire",
          "firebase",
          "angular-bootstrap",
          "get-size",
          "matches-selector",
          'outlayer',
          "masonry",
          "jquery-bridget"
          ]
        },
        mainFiles: {
          bootstrap: [ 
          'dist/css/bootstrap.min.css', 
          'dist/js/bootstrap.min.js'
          ],
          outlayer: [
          'item.js',
          'outlayer.js'
          ]
        }
      }
    },
    clean: ['public'],
    connect: {
      main: {
        options: {
          port: 8080,
          base: 'public/',
          open: true,
          livereload: true
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
              '**',
              '!**/*.jade',
              '!**/*.scss',
              '!**/*.css',
              '!**/*.js',
            ],
            dest: 'public/',
            filter: 'isFile'
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
              '**/*.jpg',
              '**/*.png'
            ],
            dest: 'public/',
            filter: 'isFile'
          }
        ]
      },
      fonts: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/fonts/',
            src: [
              'glyphicons-halflings-regular.eot',
              'glyphicons-halflings-regular.svg',
              'glyphicons-halflings-regular.ttf',
              'glyphicons-halflings-regular.woff',
              'glyphicons-halflings-regular.woff2'
            ],
            dest: 'public/fonts/',
            filter: 'isFile'
          }
        ]
      },
      icons: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/typicons.font/src/font/',
            src: [
              'typicons.eot',
              'typicons.svg',
              'typicons.ttf',
              'typicons.woff',
              'typicons.svg'
            ],
            dest: 'public/lib/',
            filter: 'isFile'
          }
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'public/css/main.css': 'public/css/main.css'
        }
      }
    },
    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.jade', '!**/_*.jade', '**/**/*.jade'],
            dest: 'public/',
            ext: '.html'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.jade', '!**/_*.jade'],
            dest: 'public/',
            ext: '.html'
          }
        ]
      }
    },
    sass: {
      prod: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'public/css/main.css': 'src/scss/main.scss'
        }
      },
      dev: {
        options: {
          sourceMap: true,
          sourceMapEmbed: true
        },
        files: {
          'public/css/main.css': 'src/scss/main.scss',
          'public/lib/build.css': 'src/css/main.css'
        }
      }
    },
    uglify: {
      bower: {
        files: {
          'public/lib/build.js': 'public/lib/build.js'
        }
      },
      main: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: ['**/*.js'],
            dest: 'public/'
          }
        ]
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'public/css/main.css',
          'public/js/**/*.js',
          'public/**/*.html'
        ]
      },
      jade: {
        files: ['src/**/*.jade'],
        tasks: ['bower_concat', 'jade:dev']
      },
      sass: {
        files: ['src/**/*.scss'],
        tasks: ['bower_concat', 'sass:dev', 'autoprefixer']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['bower_concat','babel:dev']
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'copy',
    'babel:prod',
    'bower_concat',
    'jade:prod',
    'sass:prod',
    'autoprefixer',
    'uglify',
    'cssmin'
  ]);
  grunt.registerTask('build-dev', [
    'clean',
    'copy',
    'copy:fonts',
    'sass:dev',
    'babel:dev',
    'bower_concat',
    'jade:dev',
    'autoprefixer'
  ]);

  grunt.registerTask('serve', [
    'build-dev',
    'connect',
    'watch'
  ]);

  grunt.registerTask('pages', ['gh-pages']);

};