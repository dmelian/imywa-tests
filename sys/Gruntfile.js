module.exports= function(grunt){
	
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		concat: {
			options: { 
				separator: "\n",
				banner: "(function ($,undefined) {\n",
				footer: "}(jQuery));\n",
				stripBanners: true 
			},
			dist: { src: "js/*.js", dest: "ma.js" }
		},

		less: {
			src: {
				expand: true,
				cwd: ".",
				src: "*.less.css",
				ext: ".css"
			}
		},

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-less");


	grunt.registerTask('default',[ 'concat', 'less' ]);

};
