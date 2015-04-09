module.exports = function(grunt) {
  'use strict';

  var path = require('path');

  grunt.initConfig({

    clean: {
      tmp: '.tmp'
    },

    fontello_merge: {
      option: {
        mergeFactor: 'css'
      },
      dist: {
        files: {
          '.tmp/fontello.json': [
            'src/fonts-base/fontello.json',
            'src/fonts-site/fontello.json'
          ]
        }
      }
    },

    // Download fontello fonts set based on config.json file (configured below)
    fontello: {
      dist: {
        options: {
          config: '.tmp/fontello.json',
          fonts: 'build/fontello',
          styles: '.tmp'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-fontello-merge');
  grunt.loadNpmTasks('grunt-fontello');

  grunt.registerTask('default', ['clean', 'fontello_merge', 'fontello', 'clean']);
};
