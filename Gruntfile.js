'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function(grunt){
  var pkg = grunt.file.readJSON('package.json');

  var config = {
    bower: {
      install: {
        options: {
          targetDir: 'js/lib',
          install: true,
          verbose: true,
          cleanTargetDir: true,
          cleanBowerDir: true
        }
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
        files: ['html/**/*.html', 'html-test/**/*.html'],
        tasks: ['livereload']
      },
      css: {
        files: ['css/**/*.css', 'css-test/**/*.css'],
        tasks: ['livereload']
      },
      js: {
        files: ['js/**/*.js', 'js-test/**/*.js', 'js-test/**/*.html'],
        tasks: ['livereload']
      }
    },

    qunit: {
      all: ['js-test/**/*.html']
    },

    jsdoc: {
      dist: {
        src: ['js/**/*.js'],
        options: {
          destination: 'target/doc'
        }
      }
    },
  };

  /**
   * PhantomJS がテストの実行を終了した際にトリガーされるイベントのハンドラーです。
   */
  grunt.event.on('qunit.spawn', function(url) {
    // grunt.log.ok("Running test: " + url);
  });

  grunt.initConfig(config);

  var contrib;
  for (contrib in pkg.devDependencies) {
    if (contrib.substring(0, 6) === 'grunt-') {
      // console.log(contrib);
      grunt.loadNpmTasks(contrib);
    }
  }

  grunt.registerTask('init', ['bower:install']);
  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('doc', ['jsdoc']);
  grunt.registerTask('unit', ['qunit:all']);
};

/**
 * [補足事項]
 * QUnit のイベント
 * - qunit.begin
 * - qunit.moduleStart:name
 * - qunit.testStart:name
 * - qunit.log:result, actual, expected, message, source
 * - qunit.testDone: name,failed, passed, total
 * - qunit.moduleDone: name, failed, passed, total
 * - qunit.done: failed, passed, total, runtime
 */
