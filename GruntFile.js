module.exports = function(grunt) {
  'use strict';

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    dist: 'dist'
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    dist: {
      files: {
        'dist/sticky-header.js': 'sticky-header.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.config('jasmine', {
    test: {
      src: 'dist/sticky-header.js',
      options: {
        specs: 'test/*-spec.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    options: {
      preserveComments: 'some'
    },
    dist: {
      files: {
        'dist/sticky-header.min.js': [
          'sticky-header.js'
        ]
      }
    }
  });

  grunt.registerTask('dist', [
    'clean:dist',
    'copy:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('test', [
    'jasmine:test',
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);
};
