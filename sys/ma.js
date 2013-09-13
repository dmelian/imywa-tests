(function($){

	
	$.ma= {};
	
	// First begin without apps.
	
	$.ma.currSession= {
		id: 0
	};
	
	
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


	//	To inherit from another widget $.widget(name, [Base], prototype);	

	$.widget("ma.formpio", $.ma.form, {

		options: {
		},

		_create: function(){
			$.ma.form.prototype._create.call(this);
			this.element.addClass("pio-pio");
			//$(this.element).find("button").button();
			this._update();
		},

		_setOption: function(option, value){
			this._update();
		},


		_update: function(){
		},
		
		activateWidgets: function(widgets){
			for (var id in widgets){
				$("#"+id)[widgets[id]]();
			}
			
		},


		_destroy: function(){
			//$(this.element).find("button").data("button").destroy();
			this.element.removeClass("pio-pio");
		}


	});

	
	
	
} (jQuery));

