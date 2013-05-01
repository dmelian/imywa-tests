window.onresize = adjustform;

function loadform(){
	adjustform();
	adjustmenus();
}

function adjustform(){
	var height = window.innerHeight
		- document.getElementById('titlebar').offsetHeight
		- document.getElementById('menubar').offsetHeight
		- document.getElementById('toolbar').offsetHeight
		- document.getElementById('statusbar').offsetHeight
		- 20		
		;
	var contentdiv = document.getElementById('content');
	contentdiv.style.height = height + 'px';
}

function adjustmenus(){
	var lastleft = 100;
	var menus = document.getElementById('menus');
	if (menus != null) {
		var uls = menus.getElementsByTagName('UL');
		for (var i=0; i<uls.length; i++){
			if (uls[i].id.substring(0,4) == 'menu') {
				var anchor = document.getElementById('linkto' + uls[i].id.substring(4));
				uls[i].style.left = anchor.offsetLeft;
				document.getElementById(anchor.id).onmouseover = showmenu;
				document.getElementById(anchor.id).onmouseout = hidemenu;
				document.getElementById(uls[i].id).onmouseover = showmenu;
				document.getElementById(uls[i].id).onmouseout = hidemenu;
			} else {
				uls[i].parentNode.onmouseover = showmenu;
				uls[i].parentNode.onmouseout = hidemenu;
				uls[i].style.top = 0;
				uls[i].style.left = uls[i].parentNode.offsetWidth;
			}
		}
	}	
}

function showmenu(event){
	var element = event.currentTarget;
	
	if (element.tagName == "A") {
		if (element.id.substring(0,6) == "linkto") {
			document.getElementById('menu' + element.id.substring(6)).style.visibility = "visible";
		}
	} else if (element.tagName == "UL") { 
		element.style.visibility = "visible";
	} else if (element.tagName == 'LI') {
		element.getElementsByTagName('UL')[0].style.visibility = "visible";
	}
}

function hidemenu(event){
	var element = event.currentTarget;
	
	if (element.tagName == "A") {
		if (element.id.substring(0,6) == "linkto") {
			document.getElementById('menu' + element.id.substring(6)).style.visibility = "hidden";
		}
	} else if (element.tagName == "UL") { 
		element.style.visibility = "hidden";
	} else if (element.tagName == 'LI') {
		element.getElementsByTagName('UL')[0].style.visibility = "hidden";
	}
}
