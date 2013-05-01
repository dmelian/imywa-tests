function frmxlist(form, div, theme){
	
	if (arguments.length == 0) return; // to be able to inherit from this
	
	// Attributes
	this.form= form;
	this.div= div;
	this.id= div.id;
	this.rowix= 0;
	this.rowsxpage= 10;
	this.config= {
		width: 0, 
		height: 0, 
		rowHeight: 25,
		charToPixelWidthScale: 10,
		cols: {}};
	this.mouseEvt= {
		downPoint: {x:0, y:0, pos:0},
		upPoint: {x:0, y:0},
		dragging: {status:false, originId:''}
	};
	this.scrollPos= {left:0, top:0};
	this.relativePosAdjustment= {left:0, top:0};

	//TODO Tomar el rowHeight, y los scrollwidths de su definición en el tema.


	this.sendCommand("gettabledef");

/*

	this.rowHeight= 25;
	this.scrollBarWidth= 20;
	this.scrollSizeWidth= 2;

*/
	
}		

// Inicialize the html structure

frmxlist.prototype.createStructure= function(tabledef){

	this.tabledef= tabledef;
	this.setColStyle();document.getElementById('box1pullhandle')
	this.config.bodyRows= 0; //body rows are created in resize method.
	//TODO: CALCULAR EL config.extrawidth	- this.config.selectorWidth - this.config.maximizeWidth;
	this.config.extraWidth= 50;
	
	// ELEMENTS
	/////////////////////////////

	var head= this.div.getElementsByClassName("head");// There are 2 heads: fixedcontent & scrolledcontent
	var row= document.createElement("div");
	row.className= "row";
	var icol=0;
	for (var idcol in this.tabledef.cols){
		if (this.tabledef.cols.hasOwnProperty(idcol)){
			var cell= document.createElement("div");
			cell.className= "cell";
			cell.id= idcol;
			cell.innerHTML= tabledef.cols[idcol].caption;
			var rh= document.createElement("div");
			rh.className= 'grip colresize';
			rh.id= "colresize_" + this.id + '_' + idcol;
			new resizeHandler(rh, this);
			cell.appendChild(rh);
			row.appendChild(cell);
		}
		icol++;
		if (this.tabledef.fixedcols == icol){
			head[0].appendChild(row);
			row= document.createElement("div");
			row.className= "row";
		}
	}	
	head[1].appendChild(row);
	
	//TOTHINK: ¿dynamic calculated tools?
	var foot= this.div.getElementsByClassName("foot");
	var row= document.createElement("div");
	row.className= "row";
	var icol=0;
	for (var idcol in this.tabledef.cols){
		if (this.tabledef.cols.hasOwnProperty(idcol)){
			var cell= document.createElement("div");
			cell.className= "cell";
			cell.id= idcol;
			cell.innerHTML= "foot for col" + icol;
			row.appendChild(cell);
		}
		icol++;
		if (this.tabledef.fixedcols == icol){
			foot[0].appendChild(row);
			row= document.createElement("div");
			row.className= "row";
		}
	}	
	foot[1].appendChild(row);

	// Scrollsize.
	var scrollbar= this.div.getElementsByClassName("scrollbar");
	for (var iscroll=0; iscroll < scrollbar.length ;iscroll++){
		var ss= document.createElement("div");
		ss.className= "scrollsize"; //TODO: PONER scrollx o y como id o clase
		scrollbar[iscroll].appendChild(ss);
	}

	//Events
//	var event= this.div.getElementsByClassName("event");
//	for (var ievent=0; ievent < event.length; ievent++) this.addEvent(event[ievent]);

	var resize= this.div.getElementsByClassName("resize")[0];
	resize.id= "resize_" + this.id;
	new resizeHandler(resize, this);

	window.addEventListener('resize', this, false);

	
	this.resize(0,200,true);
	
}

//Resize View.

frmxlist.prototype.resize= function (deltax, deltay){
	var style= document.getElementById(this.id + "_layoutstyle");
	var createStyle= style == undefined; 
	if (createStyle) {
		style= document.createElement('style');
		style.type= 'text/css';
		style.id= this.id + "_layoutstyle";
		layoutStyleSheet= document.getElementsByTagName("head")[0].appendChild(style).sheet;
	} else  layoutStyleSheet= style.sheet;
	var irule= 0; 
	
	// minimal width & height
	//this.config.width+= deltax; if (this.config.width < 100) this.config.width= 100;
	this.config.height+= deltay; if (this.config.height < 100) this.config.height= 100;

	// new body row count
	var lastBodyRows= this.config.bodyRows;
	//TODO: Calcular automáticamente la altura del contenido.
	this.config.bodyRows= parseInt(this.config.height / this.config.rowHeight) - 2; //Head & foot


	// TOFIND: ? clientwidth, offsetwidth or scrollwidth?
	var scrolledWidth= this.div.offsetWidth - this.config.fixedWidth - this.config.extraWidth;

	layoutStyleSheet.insertRule("div#" + this.id + " {"
		+ " height: " + this.config.height  + "px;}", irule++);
	if (!createStyle) layoutStyleSheet.deleteRule(irule);
			
	layoutStyleSheet.insertRule("div#" + this.id + " div.frozencolscontainer {"
		+ " width: " + this.config.fixedWidth  + "px;}", irule++);
	if (!createStyle) layoutStyleSheet.deleteRule(irule);
	
	layoutStyleSheet.insertRule("div#" + this.id + " div.frozencolshscroll {" 
		+ " width: " + this.config.fixedWidth  + "px;}", irule++);
	if (!createStyle) layoutStyleSheet.deleteRule(irule);

	layoutStyleSheet.insertRule("div#" + this.id + " div.listcontainer {"
		+ " width: " + scrolledWidth  + "px;}", irule++);
	if (!createStyle) layoutStyleSheet.deleteRule(irule);

	layoutStyleSheet.insertRule("div#" + this.id + " div.hscroll {"
		+ " width: " + scrolledWidth  + "px;}", irule++);
	if (!createStyle) layoutStyleSheet.deleteRule(irule);

	if (lastBodyRows < this.config.bodyRows){

		//Create new rows into the view
		var body= this.div.getElementsByClassName("body");
		for (var irow=lastBodyRows; irow < this.config.bodyRows; irow++){
		
			var row= document.createElement("div");
			row.className= "row";
			row.id= "row" + irow;
			var icol=0;
			for (var idcol in this.tabledef.cols){
				if (this.tabledef.cols.hasOwnProperty(idcol)){
					var cell= document.createElement("div");
					cell.className= "cell";
					cell.id= idcol;
					cell.innerHTML= icol==0 ? irow : "-";
					row.appendChild(cell);
				}
				icol++;
				if (this.tabledef.fixedcols == icol){
					body[0].appendChild(row);
					row= document.createElement("div");
					row.className= "row";
				}
			}	
			body[1].appendChild(row);
		}
		
	} else if (lastBodyRows > this.config.bodyRows) {
		
		// Delete the rows outside the view
		var body= this.div.getElementsByClassName("body");
		for (ibody=0; ibody < body.length; ibody++){
			for (var irow=lastBodyRows-1; irow >= this.config.bodyRows; irow--){
				//TODO: cuando la parte fija o scrollable no tiene columnas, tampoco filas que borrar
				body[ibody].removeChild(body[ibody].childNodes[irow]);
			}
		}
	}
	
	this.rowsxpage= this.config.bodyRows;
//	this.sendCommand("getdata", {"rowix":this.rowix, "rowsxpage":this.rowsxpage});
	
};


// Resize a column

frmxlist.prototype.stretchCol= function (colId, widthStretch){
	var colWidth= this.tabledef.cols[colId].width * this.config.charToPixelWidthScale + widthStretch;
	if (colWidth < 2 * this.config.charToPixelWidthScale) colWidth= 2 * this.config.charToPixelWidthScale; //Minimal col width
	this.tabledef.cols[colId].width= parseInt(colWidth / this.config.charToPixelWidthScale);
	this.setColStyle();
	this.resize(0,0);
	//TODO: send the new column width to server.

};

// Especify the styles for each column (Currently only specify the width).

frmxlist.prototype.setColStyle= function (){
	
	var style= document.getElementById(this.id + "_colstyle");
	var createStyle= style == undefined; 
	if (createStyle) {
		style= document.createElement('style');
		style.type= 'text/css';
		style.id= this.id + "_colstyle";
		colStyleSheet= document.getElementsByTagName("head")[0].appendChild(style).sheet;
	} else  colStyleSheet= style.sheet;
	
	this.config.fixedWidth= 0;
	this.config.scrolledWidth= 0;
	var icol=0;
	for (var idcol in this.tabledef.cols){
		if (this.tabledef.cols.hasOwnProperty(idcol)){
			
			//TODO poner la propiedad visible y width en el tabledef export y descomentar la línea
			//colWidth= this.tabledef.cols[icol].visible ? this.tabledef.cols[icol].width : 0;
			var colWidth= this.tabledef.cols[idcol].width * this.config.charToPixelWidthScale;
			
			if (!createStyle) colStyleSheet.deleteRule(icol); 
			colStyleSheet.insertRule("div#" + this.id + " div#" + idcol + " {width: " + colWidth + "px;}", icol);
			
			if (icol < this.tabledef.fixedcols) this.config.fixedWidth += colWidth;
			else this.config.scrolleWidth += colWidth;
			icol++;
		}
	}	
};


// Events.
// Default Handler
frmxlist.prototype.handleEvent= function(event){
	switch(event.type) {
	case 'resize': alert('resizing');
	}
};




// Resize Event. To resize the hole view or to resize a column.

frmxlist.prototype.OnResize= function (id, deltax, deltay){
	var splitedId= id.split('_');
	if (splitedId[1] == this.id){
		switch(splitedId[0]){
		case 'resize': this.resize(0, deltay); break;
		case 'colresize': this.stretchCol(splitedId[2], deltax);
		}
	}
}

// Scrolls events.

frmxlist.prototype.OnVScroll= function (id){
	
}
	
// Communications with the server.

frmxlist.prototype.sendCommand= function(command, args){

	var argString= '';
	for(var arg in args){
		argString+="&" + arg + "=" + args[arg]; 
	}
	
	var rq= new XMLHttpRequest();
	rq.parentFrame= this;
	rq.open('POST','xhrindex.php', true);
	rq.onreadystatechange = function(evt) {
/*	-------- USO DEL THIS
 * Mucho cuidadín con el uso del this. En el caso de un evento, this se cambia por el 
 * propietario del evento. El elemento html que generó el evento, o en este
 * caso el objeto xmlhttpresponse que generó el evento.
 * Por eso nos creamos una propiedad en este evento y copiamos el this de nuestro objeto.	
 * (Un poco extraño para viejos programadores como yo.) Pero funciona.
 * 	--------
 */		
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText != '') {
				//alert('getting response:('+ this.responseText +')');
				this.parentFrame.executeCommand(this.responseText);
			} //else alert('No response for this.');
		} //rq.responseText contiene la respuesta.			
	};
	
/* 	------ METODO POST
    ------ Para los nuevos Firefox
 	var data = new FormData();
	data.append('Nombre','Domingo');
	data.append('Apellidos', 'Melián Cárdenes');
	------ Para los antiguos
*/
	var postString= "sessionno=" + document.getElementsByName('sessionno')[0].value
	+ "&installationid=" + document.getElementsByName('installationid')[0].value
	+ "&sequenceno=" + document.getElementsByName('sequenceno')[0].value
	+ "&action=xhrcommand&command=" + command + "&frameid=" + this.id;
	if (argString!= "") postString+= "&" + argString;
	
	var post= encodeURI(postString);
	rq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//		rq.setRequestHeader("Content-length", post.length);
//		rq.setRequestHeader("Connection", "close");
	
	rq.send(post);
}


frmxlist.prototype.executeReceivedCommand= function(serverCommand){
/*	CUIDADÍN CON EL JSON. 
	Si el texto json no está bien construido, se aborta la ejecución sin más. 
	como el eval. 
*/
	
	if (serverCommand.substring(0,5) != 'JSON:') {
		alert(serverCommand);
		return;
	}
	var command= JSON.parse(serverCommand.substring(5));
	switch (command[0]){
	case "setTableDef":
		this.createStructure(command[1]);
		break;
		
	case "setData":
		this.setData(command[1]);
		break;
		
	default:
		alert(command[0]+ " not implemented.");	
	}		
}


//Executing server response commands.

frmxlist.prototype.setData= function(pageData){
	var mybody= this.div.getElementsByClassName('body')[0];
	for (var irow=0; irow < mybody.childNodes.length; irow++){
		var myrow= mybody.childNodes[irow];
		for (var icol= 1; icol < myrow.childNodes.length-1; icol++){
			var myCell= myrow.childNodes[icol];
			myCell.innerHTML= (pageData[irow] == undefined)? '-' : pageData[irow][myCell.id];
		}
	}
}


