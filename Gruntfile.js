/* global module:false */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      coffee: {
        files: ['*.coffee'],
        tasks: 'coffee'
      }
    },
    coffee: {
      compile: {
        files: {
          'logic.js': 'logic.coffee' // 1:1 compile
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task.
  grunt.registerTask('default', 'coffee');
};
