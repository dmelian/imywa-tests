(function($){

	$.ma= {};
	
	$.ma.currSession= {
		id: 0
	};

	$.widget("ma.maManager", {
	
		_currentForm: null,
		
		options: {
			
		},
		
		_create: function(){
			
		},
		
		_destroy: function(){
			
		},
		
		openForm: function(form, actions){

			// 1. SEND THE OPEN FORM REQUEST.
			var formContent={};
			$.ajax({ url: "ma.php?" + form, type:"POST", dataType: "json", async: false
				, data: actions
				, success: function(result, status, xhr){ formContent= result;	}
				, error: function(xhr, status, err){ alert("...Ajax error..."); }
			});
			
			// TODO: unsuccessfull request. 
			
			// 2 . DESTROY THE OLD-CURRENT FORM
			if (this._currentForm) this._currentForm.destroy();
			
			// 3 . SWITCH THE OLDER HTML CONTENT WITH THE CONTENT OBTAINED ON STEP 1
			if (formContent.html === undefined) $("#maForm").text="";
			else $("#maForm").html(formContent.html);
			
			// 4 .  ACTIVATE THE NEW-CURRENT FORM.
			var formClass=  (formContent.formClass === undefined) ? {namespace:"ma", className:"maForm"} : formContent.formClass;
			this._currentForm= $("#maForm")[formClass.className]({widgets: formContent.widgets})
				.data(formClass.namespace + "-" + formClass.className);
		}
		
	});
	
	
	$.widget("ma.maForm", {

		options: {
			widgets: {}
		},

		_create: function(){
			this.element.addClass("maForm-testing");
			this.activateWidgets();
/*			form=$("#maForm").data("maFormpio");
			form.activateWidgets(formContent.widgets);
*/			
			
			
			this._update();
		},
		
		
		_destroy: function(){
			form.deactivateWidgets(formContent.widgets);
			this.element.removeClass("maForm-testing");
		},

		_setOption: function(option, value){
			this._update();
		},


		_update: function(){
		},
		
		activateWidgets: function(){
			for (var id in this.options.widgets){
				
				var widget= this.options.widgets[id];
				widget.object= $("#"+id)[widget.className]()
					.data(widget.namespace + "-" + widget.className);
				
				if (widget.options !== undefined){
					for (var option in widget.options){
						widget.object._setOption(option, widget.options[option]);
					}
				}
			}
		},
		
		deactivateWidgets: function(){
			for (var id in this.options.widgets) this.options.widgets[id].object.destroy();
		}
		
		

	});


	//	To inherit from another widget $.widget(name, [Base], prototype);	

	$.widget("ma.maFormPio", $.ma.maForm, {

		options: {
		},

		_create: function(){
			$.ma.maForm.prototype._create.call(this);
			this.element.addClass("pio-pio");
			//$(this.element).find("button").button();
			this._update();
		},

		_setOption: function(option, value){
			this._update();
		},


		_update: function(){
		},
		


		_destroy: function(){
			//$(this.element).find("button").data("button").destroy();
			this.element.removeClass("pio-pio");
		}


	});

	
	$.widget("ma.maTextBox", {
		
		options:{
			
		},
		
		_create: function(){
			this.element.addClass("maTextBox");
		},
		
		_destroy: function(){
			this.element.removeClass("maTextBox");
			
		}
		
	});

	$.widget("ma.maButton", $.ui.button, {
		
		options:{
			
		},
		
		_create: function(){
			$.ui.button.prototype._create.call(this);
			this.element.addClass("maButton");
		},
		
		_destroy: function(){
			this.element.removeClass("maButton");
			$.ui.button.prototype._destroy.call(this);
			
		}
		
	});
	
	
	
} (jQuery));

