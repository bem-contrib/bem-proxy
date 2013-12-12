/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    },

    mocha: {
      test: {
        src: ['test/**/*.js']
      }
    }
  });

  // Load local tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');

  // Default task.
  grunt.registerTask('default', function() {
    grunt.log.writeln('not ready');
  });

  // Run tests
  grunt.registerTask('test', ['jshint', 'mocha']);
};
