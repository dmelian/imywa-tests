function formload(){
	document.getElementsByClassName('tableRow')[0].onmousedown = mousedownme;
	document.getElementsByClassName('tableRow')[0].onmousemove = mousemoveme;
	document.getElementsByClassName('tableRow')[0].onmouseover = mouseoverme;
	document.getElementsByClassName('tableRow')[0].onmouseout = mouseoutme;
	document.getElementsByClassName('tableRow')[0].onmouseup = mouseupme;
	document.getElementsByClassName('tableRow')[0].ondragstart = returnfalse;
	document.getElementsByClassName('tableRow')[0].onselectstart = returnfalse;
}

var downpoint= {x:0, y:0, pos:0};
var movepoint= {x:0, y:0};
var overpoint= {x:0, y:0};
var outpoint= {x:0, y:0};
var uppoint= {x:0, y:0};
var dragging= {status:false, originid:''};


function returnfalse(){
	return false;
}


function returntrue(){
	return true;
}


function mousedownme(event){
	downpoint.x = event.clientX;
	downpoint.y = event.clientY;
	if (event.explicitOriginalTarget.className == 'split'){
		var colNode = event.explicitOriginalTarget.parentNode;
		document.getElementById('status2').innerHTML = 
			'down on colum %1'
			.replace('%1',colNode.id)
			;
		dragging.status = true;
		dragging.originid = colNode.id;
	}
	statusme();
	return false;
}

function mousemoveme(event){
	movepoint.x = event.clientX;
	movepoint.y = event.clientY;
	statusme();
	return false;
		
}

function mouseoverme(event){
	overpoint.x = event.clientX;
	overpoint.y = event.clientY;
	statusme();
	return false;
}

function mouseoutme(event){
	outpoint.x = event.clientX;
	outpoint.y = event.clientY;
	statusme();
	return false;
}

function mouseupme(event){
	uppoint.x = event.clientX;
	uppoint.y = event.clientY;
	statusme();
	if (dragging.status) {
		dragging.status = false;
		var colNode = document.getElementById(dragging.originid);
		var newwidth = colNode.offsetWidth + uppoint.x - downpoint.x;
		if (newwidth < 16) newwidth = 16;
		colNode.style.width = newwidth;
	}
	return false;
}



function statusme(){
	document.getElementById('status').innerHTML = 
		'down:[%1,%2], move[%3,%4], over[%5,%6], out[%7,%8], up[%9,%10]'
		.replace('%1',downpoint.x).replace('%2',downpoint.y)
		.replace('%3',movepoint.x).replace('%4',movepoint.y)
		.replace('%5',overpoint.x).replace('%6',overpoint.y)
		.replace('%7',outpoint.x).replace('%8',outpoint.y)
		.replace('%9',uppoint.x).replace('%10',uppoint.y)
		;
		
}
