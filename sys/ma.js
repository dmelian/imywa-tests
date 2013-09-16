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
			var className=  (formContent.className === undefined) ? "maForm" : formContent.className;
			this._currentForm= $("#maForm")[className]({widgets: formContent.widgets})
				.data("ma-"+className);
			var peo= "peo";
//				.data("ma" + className.charAt(0).toUppercase() + className.substr(1));
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
			this.element.removeClass("maForm-testing");
/*			form=$("#maForm").data("maFormpio");
			form.deactivateWidgets(formContent.widgets);
*/			
		},

		_setOption: function(option, value){
			this._update();
		},


		_update: function(){
		},
		
		activateWidgets: function(){
			for (var id in this.options.widgets) $("#"+id)[this.options.widgets[id]]();
		},
		
		deactivateWidgets: function(){
			for (var id in this.options.widgets) {
				$widget= $("#"+id)[this.options.widgets[id]]()
					.data(this.options.widgets[id]); //Anteponer el ma.
			}
			
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

	
	
	
} (jQuery));

