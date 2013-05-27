'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function(grunt){
  var packages = grunt.file.readJSON('package.json');

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
        files:'*.html',
        tasks: ['livereload']
      },
      css: {
        files:'*.css',
        tasks: ['livereload']
      },
      js: {
        files:'*.js',
        tasks: ['livereload']
      }
    }
  });

  var contrib;
  for (contrib in packages.devDependencies) {
    if (contrib.substring(0, 6) === 'grunt-') {
      console.log(contrib);
      grunt.loadNpmTasks(contrib);
    }
  }

//  grunt.registerTask('init',
//    ['copy:init']);
  grunt.registerTask('default',
    ['livereload-start', 'connect', 'regarde']);
};
