/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Task configuration.
    requirejs: {
      compile: {
        options: {
          name: 'init',
          insertRequire: ['init'],
          baseUrl: "js",
          mainConfigFile: 'js/init.js',
          out: "js/build/app.min.js"
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('default');

};
