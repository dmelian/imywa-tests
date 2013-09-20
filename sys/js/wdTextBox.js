
$.widget("ma.wdTextBox", {
	
	options:{
		
	},
	
	_create: function(){
		this.element.addClass("maTextBox");
	},
	
	_destroy: function(){
		this.element.removeClass("maTextBox");
		
	}
	
});


