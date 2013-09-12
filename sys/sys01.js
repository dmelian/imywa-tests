(function($){

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
			
			var htmlContent= $.ajax({ url: "openform.php", type:'POST', dataType: "html", async: false
				, data: data, processData: false , contentType: false //Because of sending a FormData
			}).responseText;
			
			// 2 . DESTROY THE OLD-CURRENT FORM
			var form= $("#form").data("form"); // If there is an widget created on the div #form, destroy it;
			if (form !== undefined) form.destroy();
			
			// 3 . SWITCH THE OLDER HTML CONTENT WITH THE CONTENT OBTAINED ON STEP 1
			$("#form").html(htmlContent);
			
			// 4 .  ACTIVATE THE NEW-CURRENT FORM.
			$("#form").form();
			
			// 5 . (OPTIONAL) GET THE CURRENT DATA OF THE FORM
			
			// 6 . (OPTIONAL) END. WE WAIT FOR THE USER INTERACTION.
			
			
		});
	});

} (jQuery));

