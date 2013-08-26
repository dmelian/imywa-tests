$.widget('iwa.mywidget01', {
	options: {
	},
	
	_create: function() {
		this.element.addClass('mywidget01');
		this._container= $('<div class="container"></div>').appendTo(this.element);
		this._setOptions({
		});
	},

	_destroy: function() {
		this.element.removeClass('mywidget01');

	},

	_setOption: function(key, value){

	}

});
