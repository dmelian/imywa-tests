
function frmxform(themeId){

	if (arguments.length == 0) return; // to be able to inherit from this

	//Attributes
	//this.theme= new theme("theme/" + themeId);
	this.frames= new Array();
	
	var divs= document.getElementsByClassName('framecontainer')[0].childNodes;
	for (var idiv= 0, iframe=0; idiv < divs.length; idiv++){
		if (divs[idiv].tagName == 'DIV' && divs[idiv].className != undefined){
			if (divs[idiv].className in window) {
				this.frames[iframe++]= new window[divs[idiv].className](this, divs[idiv]); 
			} else {
				if (divs[idiv].className != '') {
					alert('No se ha definido la clase <'.concat(divs[idiv].className, '> en el formulario.'));
				}
			}
		}
	}
	
}

/*
frmxform.prototype.resize= function(){
	var myTopAdjustment= 0;

	for (var o=0; o < this.bodyObjects.length; o++){
		this.bodyObjects[o].div.style.top= myTopAdjustment;
		myTopAdjustment+= this.bodyObjects[o].relativePosAdjustment.top; 
	}
};
*/	
