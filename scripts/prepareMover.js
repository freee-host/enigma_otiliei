// JavaScript Document
<!--
function scrollButtons(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("thumbnails")) return false;
	if(!document.getElementById("thumbcolumn3")) return false;
	if(!document.getElementById("thumbcolumn4")) return false;
	
	var col1 = document.getElementById("thumbcolumn3");
	var col1height = col1.offsetHeight;
	var col2 = document.getElementById("thumbcolumn4");
	var col2height = col2.offsetHeight;
	
		if(document.getElementById("webup")){
			var webup = document.getElementById("webup");
			webup.onclick = function() {
				//var final_x = 0;,final_x
				var final_y = getFinalMove("thumbcolumn3","top",386,col1height);
				moveElement("thumbcolumn3",final_y,20);
				return false;
			}
		}
		
		if(document.getElementById("webdown")){
			var webdown = document.getElementById("webdown");
			webdown.onclick = function() {
				//var final_x = 0;,final_x
				var final_y = getFinalMove("thumbcolumn3","top",-394,col1height);
				moveElement("thumbcolumn3",final_y,20);
				return false;
			}
		}
		
		if(document.getElementById("printup")){
			var printup = document.getElementById("printup");
			printup.onclick = function() {
				// var final_x = 91;final_x,
				var final_y = getFinalMove("thumbcolumn4","top",386,col2height);
				moveElement("thumbcolumn4",final_y,20);
				return false;
			}
		}
		
		if(document.getElementById("printdown")){
			var printdown = document.getElementById("printdown");
			printdown.onclick = function() {
				// var final_x = 91;final_x,
				var final_y = getFinalMove("thumbcolumn4","top",-394,col2height);
				moveElement("thumbcolumn4",final_y,20);
				return false;
			}
		}
}

function getFinalMove(elementID,direction,distance,elemSize) {
	var elem = document.getElementById(elementID);

	if(!elem.style.top){
		elem.style.top = "0px";
	}
	
	var pos = parseInt(elem.style.top);
	var finalpos = pos + distance;
	
	if(finalpos >= 0) {
		return 0;
	}
	else if(finalpos <= (394-elemSize)) {
		return (394-elemSize);
	}
	else {
		return finalpos;
	}
}

function showArrows(){
	// find column heights
		var col1 = document.getElementById("thumbcolumn3");
		var col1height = col1.offsetHeight;
		var col2 = document.getElementById("thumbcolumn4");
		var col2height = col2.offsetHeight;
		if(!col1.style.top){
				col1.style.top = "0px";
		}
		var pos1 = parseInt(col1.style.top);
		if(!col2.style.top){
				col2.style.top = "0px";
			}
		var pos2 = parseInt(col2.style.top);
	// show or hide up/down arrows if needed
		if(col1height >= 410) {
			if(pos1 >= 0) {
				document.getElementById("webdown").style.visibility = "visible";
				document.getElementById("webup").style.visibility = "hidden";
			}
			else if(pos1 <= (410-col1height)) {
				document.getElementById("webdown").style.visibility = "hidden";
				document.getElementById("webup").style.visibility = "visible";
			}
			else {
				document.getElementById("webdown").style.visibility = "visible";
				document.getElementById("webup").style.visibility = "visible";
			}
		}
		if(col2height >= 410) { 
			if(pos2 >= 0) {
				document.getElementById("printdown").style.visibility = "visible";
				document.getElementById("printup").style.visibility = "hidden";
			}
			else if(pos2 <= (410-col2height)) {
				document.getElementById("printdown").style.visibility = "hidden";
				document.getElementById("printup").style.visibility = "visible";
			}
			else {
				document.getElementById("printdown").style.display = "visible";
				document.getElementById("printup").style.display = "visible";
			}
		}	
}
addLoadEvent(scrollButtons);
addLoadEvent(showArrows);
-->