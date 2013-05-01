

function xlist(form, div, theme){

	frmxlist.apply(this, arguments);
}

xlist.prototype= new frmxlist();
xlist.prototype.constructor= xlist;

xlist.prototype.sendCommand= function(command, args){

/* It is a simulation of an ajax request. */

	switch (command){
		case "gettabledef":
			var response= 'JSON:["setTableDef",{'
				+ '"caption": "Mi Caption"'
				+ ',"fixedcols": 1'
				+ ',"cols":{'
					+ '"id": {"caption":"Identificador", "width":20}'
					+ ',"name": {"caption":"Nombre", "width":10}'
					+ ',"description": {"caption":"Descripción", "width":8}'
				+ '}'
				+ '}]';
			this.executeReceivedCommand(response);
			break;

		case "getdata":
			
			var response= 'JSON:["setData",[';
			for (r=0; r<args.rowsxpage; r++){
				if (r!=0) response+= ",";
				var id= r + args.rowix;
				response+=  '{"id":%ID%,"name":"%DIVID%-%ID%","description":"Descripción del ID-%ID%"}'
					.replace(/%ID%/g, id).replace("%DIVID%", this.id);
			}
			response+= ']]';
			
			this.executeReceivedCommand(response);
			break;

	default:
		alert(command+ " simulation not implemented.");	
	}
}



