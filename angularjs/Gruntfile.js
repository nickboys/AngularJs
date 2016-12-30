/**
 * Created by huangjian01 on 2016/12/30.
 */
module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {

                separator: ';'
            },
            dist: {

                src: ['app/src/**/*.js'],

                dest: 'app/dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {

                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {

                    'app/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'app/src/**/*.js'],
            options: {

                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        watch: {

            files: ['<%= jshint.files %>','app/index.html'],
            tasks: ['jshint']
        },

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729,
                keepalive: true,
            },
            server: {
                options: {
                    open: true,
                    base: [
                        ''
                    ]
                }
            }

        }
});

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('test', ['concat','connect','wiredep','uglify','jshint','watch']);

};