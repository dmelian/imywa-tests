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
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");

	grunt.registerTask('default',[ 'concat' ]);

};
