
function loadform(config){
	
	createcolstyles(config);
	adjustmenus();
	adjustform();
	
	//Events
	var formtable = document.getElementById('formtable');
	formtable.getElementsByClassName('vscroll')[0].onscroll = vscrollme;
	formtable.getElementsByClassName('hscroll')[0].onscroll = hscrollme;
	window.onresize = adjustform;
}

function createcolstyles(config){
	style = document.styleSheets[0];
	rulecount = style.cssRules.length;
	
	var div=[{class:'tableHeader', color:'white', backcolor:'navy'}
			,{class:'tableContent', color:'black', backcolor:'whitesmoke'}
			,{class:'tableFooter', color:'black', backcolor:'gray'}];
	for (var d=0; d < div.length; d++){
		var fixedselector = 'div.tableContainer div.%1'.replace('%1', div[d].class);
		var rule = '%fs div.tableRow { height: %1px; overflow: hidden; color: %6; background-color: %7; }';
		style.insertRule(rule.replace('%fs',fixedselector).replace('%1', config.heights[d]).replace('%6',div[d].color).replace('%7',div[d].backcolor), rulecount++);
		if (d==1){
			rule = '%fs div.tableRowAlt { height: %1px; overflow: hidden; color: %6; background-color: %7; }';
			style.insertRule(rule.replace('%fs',fixedselector).replace('%1', config.heights[d]).replace('%6',div[d].color).replace('%7','white'), rulecount++);
		}
		
		
		var left = 0; var top = 0;
		for (var col=0; col<config.widths.length; col++){
			rule = '%fs div#col%1 { position: relative;	top: %2px; left: %3px; width: %4px; height: %5px;}'
			style.insertRule(rule.replace('%fs',fixedselector).replace('%1',col)
				.replace('%2',top).replace('%3',left).replace('%4',config.widths[col]).replace('%5',config.heights[d])
				, rulecount++);
			left += config.widths[col];
			top -= config.heights[d];
		}
	}
}


function adjustform(){
	var heightadjust = 80;
	var widthadjust = 16;
	
	var tablecontainer = document.getElementById('formtable');
	var tableview = tablecontainer.getElementsByClassName('tableView')[0];
	
	var colswidth = 0;
	var colcount = 0;
	var rowheight = 0;
	var voidwidth = 0;
		
	var headerheight = 0;
	var rows = tableview.getElementsByClassName('tableHeader')[0].getElementsByClassName('tableRow');
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
		//document.getElementById('statusbar').innerHTML = "window.innerWidth = " + window.innerWidth + ", style.width =" + voidcell.style.width + ", voidwidth =" + voidwidth;
		voidcell.style.backgroundColor = 'navy';
		voidcell.style.color = 'navy';
	}
	
	var footerheight = 0;
	var rows = tableview.getElementsByClassName('tableFooter')[0].getElementsByClassName('tableRow');
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
	var rows = tableview.getElementsByClassName('tableContent')[0].childNodes;
	var rowheight = 0;
	for (i=0; i<rows.length; i++) {
		if (rows[i].className != null && rows[i].className.substring(0,8) == 'tableRow') {
			contentheight += rows[i].offsetHeight;
			var voidcell = rows[i].lastChild;
			if (voidcell.className != 'voidCol') {
				rows[i].innerHTML += '<div class="voidCol">V O I D</div>';
				voidcell = rows[i].lastChild;
				voidcell.style.position = 'relative';
				voidcell.style.overflow = 'hidden';
			}
			if (rowheight == 0){
				rowheight = rows[i].getElementsByClassName('tableCell')[0].offsetHeight;
			}
			voidcell.style.top = -(colcount * rowheight) +'px';
			voidcell.style.left = colswidth +'px';
			voidcell.style.height = rowheight +'px' ;
			voidcell.style.width = voidwidth +'px';
			voidcell.style.color = 'white';
		}
	}
	
	var contentspace = window.innerHeight
		- document.getElementById('titlebar').offsetHeight
		- document.getElementById('menubar').offsetHeight
		- document.getElementById('toolbar').offsetHeight
		- document.getElementById('statusbar').offsetHeight
		- document.getElementById('header').offsetHeight
		- document.getElementById('footer').offsetHeight
		- headerheight - footerheight
		- heightadjust
		;
	
	if (contentspace > 0 ){
		if (contentspace >= contentheight) contentspace = contentheight;
		tableview.getElementsByClassName('scrollTableContent')[0].style.height = contentspace;
		tablecontainer.getElementsByClassName('scrollTableView')[0].style.width = (window.innerWidth - 36) + 'px';
		tableview.style.height = (headerheight + footerheight + contentspace) + 'px';
		if (window.innerWidth > colswidth) tableview.style.width = window.innerWidth +'px';  else tableview.style.width = colswidth +'px';
		tablecontainer.style.height = (headerheight + footerheight + contentspace + 40) + 'px';
		tablecontainer.style.width = (window.innerWidth -16) + 'px';
		
		
		var vscroll = tablecontainer.getElementsByClassName('vscroll')[0];
		vscroll.style.width = '20px';
		vscroll.style.left = (window.innerWidth - 36)+'px';
		vscroll.style.top = -(headerheight+footerheight+contentspace)+'px';
		vscroll.style.height = (headerheight+footerheight+contentspace)+'px';
		vscroll.getElementsByClassName('vscrollsize')[0].style.height = headerheight + footerheight + contentheight;

		var hscroll = tablecontainer.getElementsByClassName('hscroll')[0];
		hscroll.style.height = '20px';
		hscroll.style.left = '0px';
		hscroll.style.top = -(headerheight+footerheight+contentspace)+'px';
		hscroll.style.width = (window.innerWidth - 36)+'px';
		hscroll.getElementsByClassName('hscrollsize')[0].style.width = colswidth;

/*		document.getElementById('statusbar').innerHTML = 
			"top = " + vscroll.style.top
			+ ", left =" + vscroll.style.left
			+ ", height =" + vscroll.style.height
			+ ", width =" + vscroll.style.width
			;
*/
/*
 		var hscroll = tablecontainer.getElementsByClassName('hscroll')[0];
		hscroll.style.top = -(headerheight + footerheight + contentspace)+'px';
		hscroll.style.width = window.innerWidth - 16;
*/	}
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
	var tablecontainer = document.getElementById("formtable");
	tablecontainer.getElementsByClassName('tableContent')[0].style.top =  "-" + event.target.scrollTop + "px";
}

function hscrollme(event){
	var tablecontainer = document.getElementById("formtable");
	var tableview = tablecontainer.getElementsByClassName('tableView')[0]
	tableview.style.left =  "-" + event.target.scrollLeft + "px";
	tableview.style.width = tableview.style.width + event.target.scrollLeft + "px";
	
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

