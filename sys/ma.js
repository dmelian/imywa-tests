(function($){

	$.widget("ma.wdManager", {
	
		_currentForm: null,
		
		options: {
			
		},
		
		_create: function(){
			
		},
		
		_destroy: function(){
			
		},
		
		execAction: function(action){
			switch (action.action){
			case "openForm": 
				this.openForm(action.form, action.arguments);
				break;
			default:
				this.sendAction(action.action, action);
			}
		},
		
		openForm: function(form, actions){

			// 1. SEND THE OPEN FORM REQUEST.
			var formContent={};
			if (!actions) actions={};
			actions.action= 'openForm';
			$.ajax({ url: "ma.php?" + form, type:"POST", dataType: "json", async: false
				, data: actions
				, success: function(result, status, xhr){ formContent= result;	}
				, error: function(xhr, status, err){ alert("...Ajax error..."); }
			});
			
			// TODO: unsuccessfull request. 
			
			// 2 . DESTROY THE OLD-CURRENT FORM
			if (this._currentForm) this._currentForm.destroy();
			
			// 3 . SWITCH THE OLDER HTML CONTENT WITH THE CONTENT OBTAINED ON STEP 1
			if (!formContent.html) $("#maForm").text="";
			else $("#maForm").html(formContent.html);
			
			// 4 .  ACTIVATE THE NEW-CURRENT FORM.
			var className=  (!formContent.className) ? "ma-wdForm" : formContent.className;
			this._currentForm= $("#maForm")[className.split("-")[1]]({widgets: formContent.widgets}).data(className);
			
			if (!!formContent.log) console.log(formContent.log);
		},

		sendAction: function(action, args){
			var actionResponse={command: "close"};
			var actions=args;
			actions.action= action;
			$.ajax({ url: "ma.php?" + action, type:"POST", dataType: "json", async: false
				, data: actions
				, success: function(result, status, xhr){ actionResponse= result;	}
				, error: function(xhr, status, err){ alert("...Ajax error..."); }
			});

			// TODO: unsuccessfull request. 

			this.execActionResponse(actionResponse);
		},
		
		execActionResponse: function(actionResponse){
			switch (actionResponse.command){
			case "openLocation": 
				window.location = actionResponse.location;
				break;
			}
		}
		
	});
	
	
	$.widget("ma.wdForm", {

		options: {
			widgets: {}
		},

		_create: function(){
			this.element.addClass("maForm-testing");
			this.activateWidgets();
			this._update();
		},
		
		
		_destroy: function(){
			this.deactivateWidgets();
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
			this._on({click: "action"});
		
		},
		
		_destroy: function(){
			this._off(this.element,"click");
			this.element.removeClass("maButton");
			this._super();//$.ui.button.prototype._destroy.call(this);
			
		},
		
		action: function(event){  
		//TODO: Desde aquí hay que lanzar un open formulario, que cierra el formulario actual del que este botón es parte.
			$.ma.manager.execAction(this.options.action);
		}
		
	});
	
	
	
} (jQuery));

