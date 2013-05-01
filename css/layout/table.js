function adjustpage(){
	document.getElementById("mytablevscroll").onscroll = vscrollme;
}

function vscrollme(event){
	document.getElementById("scrollvalue").innerHTML = event.target.scrollTop;
	document.getElementById("mytablecontent").style.top =  "-" + event.target.scrollTop + "px";
}
