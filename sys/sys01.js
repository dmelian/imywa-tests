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
	
	
	$(function(){

		$("#start").button().one("click", function(event){
			$(this).button("disable");
			event.preventDefault();
			
			// test code (unencapsulated OPEN FORM)
			
			// 1 . GET THE NEW FORM CONTENT
			/* 
			 * In this case the server must (or not) push the data of the current form on the form stack, to save it for a later moment.
			 * 
			 */
			
			var data=  new FormData();
			data.append("XHR", 1);
			data.append("sessionId", 1);
			
			var formContent={};
			$.ajax({ url: "sys01-openform.php", type:'POST', dataType: "json", async: false
				, data: data, processData: false , contentType: false //Because of sending a FormData
				,success: function(result, status, xhr){formContent= result;}
			});
			
			// 2 . DESTROY THE OLD-CURRENT FORM
			var form= $("#form").data("form"); // If there is an widget created on the div #form, destroy it;
			if (form !== undefined) form.destroy();
			
			// 3 . SWITCH THE OLDER HTML CONTENT WITH THE CONTENT OBTAINED ON STEP 1
			if (formContent.html === undefined) $("form").text="";
			else $("#form").html(formContent.html);
			
			
			// 4 .  ACTIVATE THE NEW-CURRENT FORM.
			var className=  (formContent.className === undefined) ? "form" : formContent.className;
			$("#form")[className]();
			form=$("#form").data("maFormpio");
			form.activateWidgets(formContent.widgets);
			
			// 5 . (OPTIONAL) GET THE CURRENT DATA OF THE FORM
			
			// 6 . (OPTIONAL) END. WE WAIT FOR THE USER INTERACTION.
			
			
		});
	});

} (jQuery));

