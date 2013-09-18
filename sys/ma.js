(function($){

	$.widget("ma.wdManager", {
	
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
			var className=  (formContent.className === undefined) ? "ma-wdForm" : formContent.className;
			this._currentForm= $("#maForm")[className.split("-")[1]]({widgets: formContent.widgets}).data(className);
		}
		
	});
	
	
	$.widget("ma.wdForm", {

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
				widget.object= $("#"+id)[widget.className.split("-")[1]]()
					.data(widget.className);
				
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

	$.widget("ma.wdFormPio", $.ma.wdForm, {

		options: {
		},

		_create: function(){
			this._super(); //$.ma.wdForm.prototype._create.call(this);
			this.element.addClass("pio-pio");
		},


		_destroy: function(){
			this.element.removeClass("pio-pio");
			this._super();
		}


	});

	
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

	$.widget("ma.wdButton", $.ui.button, {
		
		options:{
			action: {}
		},
		
		_create: function(){
			this._super(); //$.ui.button.prototype._create.call(this);
			this.element.addClass("maButton");
		
		},
		_destroy: function(){
			this.element.removeClass("maButton");
			this._super();//$.ui.button.prototype._destroy.call(this);
			
		}
		
	});
	
	
	
} (jQuery));

