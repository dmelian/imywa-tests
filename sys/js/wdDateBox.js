
$.widget("ma.wdDateBox", {
	
	options:{
		id: '',
		data: ''
		
	},
	
	_create: function(){
		this.element.addClass("maDateBox");
		this._on({focus: "onUnformat"}); this._on({blur: "onValidate"});

	},
	
	_destroy: function(){
		this._off(this.element,"focus"); this._off(this.element,"blur");
		this.element.removeClass("maDateBox");
		
	},
	
	/* The data is unformat before edit it */
	onUnformat: function(event){
		console.log('unformat');
		
	},
	
	/* The data is formated when it is showing to the user. */
	onFormat: function(event){
		
	},
	
	/* After edit, the data is valitated by the server */
	onValidate: function(event){
		console.log('validate');
		
	}

	
});


