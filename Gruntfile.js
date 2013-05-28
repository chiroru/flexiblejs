'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function(grunt){
  var pkg = grunt.file.readJSON('package.json');

  grunt.event.on('qunit.spawn', function(url) {
  });

  grunt.initConfig({
    bower: {
      install: {
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')];
          }
        }
      }
    },
    regarde: {
      html: {
        files: ['src/**/*.html', 'test/**/*.html'],
        tasks: ['livereload']
      },
      css: {
        files: ['src/**/*.css', 'test/**/*.css'],
        tasks: ['livereload']
      },
      js: {
        files: ['src/**/*.js', 'test/**/*.js'],
        tasks: ['livereload']
      }
    },
    qunit: {
      all: ['test/**/*.html']
    },
    watch: {
      files: ['test/**/*.html', 'src/**/*.js'],
      tasks: ['qunit']
    },
    yuidoc: {
      compile: pkg,
      options: {
        paths: ['./src/'],
        outdir: 'doc'
      }
    }
  });

  var contrib;
  for (contrib in pkg.devDependencies) {
    if (contrib.substring(0, 6) === 'grunt-') {
      console.log(contrib);
      grunt.loadNpmTasks(contrib);
    }
  }

  grunt.registerTask('init', ['bower:install']);
  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('doc', ['yuidoc']);
};
