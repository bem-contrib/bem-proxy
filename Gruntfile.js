/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint : {
      src : ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    },

    mocha : {
      test : {
        src : ['test/**/*.js']
      }
    },

    jscs : {
      main : [ "*.js" ]
    }
  });

  // Load local tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks("grunt-jscs-checker");

  // Default task.
  grunt.registerTask('default', function () {
    grunt.log.writeln('not ready');
  });

  // Run tests
  grunt.registerTask('test', ['jscs', 'jshint', 'mocha']);
};
