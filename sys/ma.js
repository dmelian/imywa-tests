(function($){

	$.widget("ma.form", {

		options: {
		},

		_create: function(){
			this.element.addClass("ma-form");
			this._update();
		},

		_setOption: function(option, value){
			this._update();
		},


		_update: function(){
		},


		_destroy: function(){
			this.element.removeClass("ma-form");
		}


	});


} (jQuery));

