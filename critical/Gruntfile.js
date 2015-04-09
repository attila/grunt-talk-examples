module.exports = function(grunt) {
  'use strict';

  var path = require('path');

  grunt.initConfig({

    connect: {
      server: {
        options: {
          hostname: '127.0.0.1',
          port: 8999,
          base: path.join('src')
        }
      }
    },

    critical_css: {
      options: {
        foo: 'bar'
      },
      dist: {
        url: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/index.html',
        dest: 'build/critical.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-critical-css');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'critical_css']);
};
