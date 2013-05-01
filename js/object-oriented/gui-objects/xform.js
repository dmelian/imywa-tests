
function xform(theme){

	frmxform.apply(this, arguments);
}

xform.prototype= new frmxform();
xform.prototype.constructor= xform;

