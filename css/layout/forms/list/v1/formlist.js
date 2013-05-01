window.onresize = adjustform2;

function loadform(){
	adjustform2();
	adjustmenus();
	document.getElementById("mytablevscroll").onscroll = vscrollme;
}

function adjustform(){
	var tablecontainer = document.getElementById('tableContainer');
		
	var headerheight = 0;
	var rows = tablecontainer.getElementsByClassName('tableHeader')[0].getElementsByClassName('tableRow');
	for (i=0; i<rows.length; i++) headerheight += rows[i].offsetHeight;
	
	var footerheight = 0;
	var rows = tablecontainer.getElementsByClassName('tableFooter')[0].getElementsByClassName('tableRow');
	for (i=0; i<rows.length; i++) footerheight += rows[i].offsetHeight;
	
	var contentheight = window.innerHeight
		- document.getElementById('titlebar').offsetHeight
		- document.getElementById('menubar').offsetHeight
		- document.getElementById('toolbar').offsetHeight
		- document.getElementById('statusbar').offsetHeight
		- document.getElementById('header').offsetHeight
		- headerheight - footerheight
		- 20
		;
	
	if (contentheight > 0){
		tablecontainer.style.height = (headerheight + footerheight + contentheight ) + 'px';
		tablecontainer.getElementsByClassName('tableContentContainer')[0].style.height = contentheight;
		var vscroll = tablecontainer.getElementsByClassName('vscroll')[0];
		vscroll.style.height = headerheight + footerheight + contentheight;
		vscroll.style.top = -(headerheight + footerheight + contentheight);
		
	}
	
}

function adjustform2(){
	var heightadjust = 36;
	var widthadjust = 36;
	
	var tablecontainer = document.getElementById('tableContainer');
	
	var colswidth = 0;
	var colcount = 0;
	var rowheight = 0;
	var voidwidth = 0;
		
	var headerheight = 0;
	var rows = tablecontainer.getElementsByClassName('tableHeader')[0].getElementsByClassName('tableRow');
	for (var i=0; i<rows.length; i++) {
		headerheight += rows[i].offsetHeight;
		var voidcell = rows[i].lastChild;
		if (voidcell.className != 'voidCol') {
			rows[i].innerHTML += '<div class="voidCol">V O I D</div>';
			voidcell = rows[i].lastChild;
			voidcell.style.position = 'relative';
			voidcell.style.overflow = 'hidden';
		}
		if (i == 0){
			var cells = rows[i].getElementsByClassName('tableCell');
			for (var j=0; j<cells.length; j++) {
				colswidth += cells[j].offsetWidth;
			}
			rowheight = cells[0].offsetHeight;
			colcount = cells.length;
			voidwidth = window.innerWidth - widthadjust - colswidth;
			if (voidwidth < 0) voidwidth = 0;
		}
		voidcell.style.top = -(colcount * rowheight) +'px';
		voidcell.style.left = colswidth +'px';
		voidcell.style.height = rowheight +'px' ;
		voidcell.style.width = voidwidth +'px';
		document.getElementById('statusbar').innerHTML = "window.innerWidth = " + window.innerWidth + ", style.width =" + voidcell.style.width + ", voidwidth =" + voidwidth;
		voidcell.style.backgroundColor = 'navy';
		voidcell.style.color = 'navy';
	}
	
	var footerheight = 0;
	var rows = tablecontainer.getElementsByClassName('tableFooter')[0].getElementsByClassName('tableRow');
	for (i=0; i<rows.length; i++) {
		footerheight += rows[i].offsetHeight;
		var voidcell = rows[i].lastChild;
		if (voidcell.className != 'voidCol') {
			rows[i].innerHTML += '<div class="voidCol">V O I D</div>';
			voidcell = rows[i].lastChild;
			voidcell.style.position = 'relative';
			voidcell.style.overflow = 'hidden';
		}
		if (i == 0){
			var rowheight = rows[i].getElementsByClassName('tableCell')[0].offsetHeight;
		}
		voidcell.style.top = -(colcount * rowheight) +'px';
		voidcell.style.left = colswidth +'px';
		voidcell.style.height = rowheight +'px' ;
		voidcell.style.width = voidwidth +'px';
		voidcell.style.backgroundColor = 'gray';
		voidcell.style.color = 'gray';
	}
	
	var contentheight = 0;
	var rows = tablecontainer.getElementsByClassName('tableContent')[0].getElementsByClassName('tableRow');
	for (i=0; i<rows.length; i++) {
		contentheight += rows[i].offsetHeight;
		var voidcell = rows[i].lastChild;
		if (voidcell.className != 'voidCol') {
			rows[i].innerHTML += '<div class="voidCol">V O I D</div>';
			voidcell = rows[i].lastChild;
			voidcell.style.position = 'relative';
			voidcell.style.overflow = 'hidden';
		}
		if (i == 0){
			var rowheight = rows[i].getElementsByClassName('tableCell')[0].offsetHeight;
		}
		voidcell.style.top = -(colcount * rowheight) +'px';
		voidcell.style.left = colswidth +'px';
		voidcell.style.height = rowheight +'px' ;
		voidcell.style.width = voidwidth +'px';
		voidcell.style.backgroundColor = 'white';
		voidcell.style.color = 'white';
	}
	
	var contentspace = window.innerHeight
		- document.getElementById('titlebar').offsetHeight
		- document.getElementById('menubar').offsetHeight
		- document.getElementById('toolbar').offsetHeight
		- document.getElementById('statusbar').offsetHeight
		- document.getElementById('header').offsetHeight
		- headerheight - footerheight
		- heightadjust
		;
	
	if (contentspace > 0 ){
		if (contentspace >= contentheight) contentspace = contentheight;
		tablecontainer.style.height = (headerheight + footerheight + contentspace) + 'px';
		tablecontainer.getElementsByClassName('tableContentContainer')[0].style.height = contentspace;
		var vscroll = tablecontainer.getElementsByClassName('vscroll')[0];
		vscroll.style.height = (headerheight + footerheight + contentspace)+'px';
		vscroll.style.top = -(headerheight + footerheight + contentspace)+'px';
		vscroll.style.left = colswidth + voidwidth;
/*		var hscroll = tablecontainer.getElementsByClassName('hscroll')[0];
		hscroll.style.top = -(headerheight + footerheight + contentspace)+'px';
*/
	}
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


function vscrollme(event){
	//document.getElementById("scrollvalue").innerHTML = event.target.scrollTop;
	document.getElementById("mytablecontent").style.top =  "-" + event.target.scrollTop + "px";
}


function submit(){ 
	document.forms[0].submit();
}

function addhidden(hidname, hidvalue){
	var newinput = document.createElement("input");
	
	newinput.setAttribute("type", "hidden");
	newinput.setAttribute("name", hidname);
	newinput.setAttribute("value", hidvalue);

	document.forms[0].appendChild(newinput);
}

function submitlookup(id){
	addhidden('action', 'lookup');
	addhidden('lookup', id);
	submit();
}

function submitaction(id){
	addhidden('action', id);
	submit();
}

function showtab(id, selected){
	var tabs_container = document.getElementById("tab_" + id);
	var tabs = tabs_container.getElementsByTagName("li");
	tabs[selected].className = "selected"; 
	var content = document.getElementById("tabcontent"+id+selected);  
	content.className = "tabcontentSelected";
	for (var i=0; i<tabs.length; i++){
		if (i != selected) {
			tabs[i].className = ''; 
			content =  document.getElementById("tabcontent"+id+i);
			content.className = "tabcontent";
		}
	}
	var hidden_selected = document.getElementById("tabselected_" + id);
	hidden_selected.setAttribute("value", selected);
}

