/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          it: true
        }
      }
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
