// JavaScript Document
<!--

function getHTTPObject() {
	var xhr = false;
	if (window.ActiveXObject) {
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				xhr = false;
			}
		}
	} else if (window.XMLHttpRequest) {
		try {
			xhr = new XMLHttpRequest();
		} catch(e) {
			xhr = false;
		}
	}
	return xhr;
}

function loadProject(id, pid) {
	var request = getHTTPObject();
	if (request) {
		var gallery = document.getElementById("gallerycontainer");
		loader = document.getElementById("loadimg");
		// get elements to be swapped
		// img should always be swapped
		var imgholder = document.getElementById("imgholder");
		var oldimage = document.getElementById("projectimage");
		// only swapped if new project
		var titleholder = document.getElementById("titleholder");
		var desctext = document.getElementById("desc");
		var tools = document.getElementById("toolsholder");
		var sublinks = document.getElementById("sublinks");
		if(document.getElementById("urlholder")){
			var urlholder = document.getElementById("urlholder");
		}
		request.onreadystatechange = function() {
			if(request.readyState == 1) { 
				loader.style.display = "block"; 
				oldimage.style.visibility = "hidden";
			}
			if(request.readyState == 2) {
				loader.style.display = "block"; 
				oldimage.style.visibility = "hidden";
			}
			if(request.readyState == 3) {
				loader.style.display = "block"; 
				oldimage.style.visibility = "hidden";
			}
			if(request.readyState == 4) {
				if (request.status == 200) {
					var response = request.responseText;
					// alert(response);
					if(response){
						// split the vars
						var data = response.split("*#*#*#*");
						for(var i=0; i<data.length; i++){
							var temp = data[i].split("=");
							if(temp[0] == "newimg"){ 
								var newimg = temp[1];
							}
							if(temp[0] == "title"){ var newtitle = temp[1]; }
							if(temp[0] == "desc"){ var newdesc = temp[1]; }
							if(temp[0] == "linkcounter"){ var counter = temp[1]; }
							if(temp[0] == "tools"){ var newtools = temp[1]; }
							if(temp[0] == "url"){ var newurl = temp[1]; }
						}
						
						// update title
						var t_text = document.createTextNode(newtitle);
						updateEleNode(titleholder,t_text);
						// update description
						desctext.innerHTML = newdesc;
						//
						// need to extract any special char's and html tags before replacing
						// var d_text = document.createTextNode(newdesc);
						// updateEleNode(desctext,d_text);
						
						// update tools
						if(newtools != "null"){
							// <strong>Project Tools:</strong>&nbsp;
							var str = document.createElement("strong");
							var str_text = document.createTextNode("Project Tools: ");
							str.appendChild(str_text);
							var tool_text = document.createTextNode(" " + newtools);
							removeAllChildren(tools);
							tools.appendChild(str);
							tools.appendChild(tool_text);
						}
						
						// update url link
						if(urlholder){
							urlholder.parentNode.removeChild(urlholder);
						}
						if(newurl != "null"){
							// create url node
							var url = document.createElement("span");
							url.setAttribute("id","urlholder");
							url.setAttribute("class","url");
							var u_link = document.createElement("a");
							u_link.setAttribute("href","http://"+newurl);
							u_link.setAttribute("target","_blank");
							var u_text = document.createTextNode("Launch Site");
							u_link.appendChild(u_text);
							url.appendChild(u_link);
							insertAfter(url,tools);
						}
						
						// sub links
						if(counter > 1){
							if(sublinks){
								sublinks.parentNode.removeChild(sublinks);
							}
							sublinks = document.createElement("span");
							sublinks.setAttribute("id","sublinks");
							sublinks.setAttribute("class","tools");
							var str = document.createElement("strong");
							var str_text = document.createTextNode("View More: ");
							str.appendChild(str_text);
							sublinks.appendChild(str);
							for(var i=1; i<=counter; i++){
								var newlink = document.createElement("a");
								newlink.setAttribute("href","?id="+id+"&pid="+i);
								var linktext = document.createTextNode(i);
								var spacer = document.createTextNode('\u00a0\u00a0');
								newlink.appendChild(linktext);
								sublinks.appendChild(newlink);
								sublinks.appendChild(spacer);
							}
							insertAfter(sublinks,desctext);
						}
						
						// remove the old image
						imgholder.removeChild(oldimage);
						
						// replace image
						newimage = document.createElement("img");
						newimage.setAttribute("src",newimg);
						newimage.setAttribute("alt",newtitle);
						newimage.setAttribute("id","projectimage");
						var isadded = imgholder.insertBefore(newimage,loader);
						if(isadded){
							// alert("test");
							imageInterval = setInterval("isImageLoaded()",500);
						}
						projectSubLinks();
					}
				}
			}
		};
		request.open("GET.html", "_assets/scripts/load_project5445.html?id="+id+"&pid="+pid, true);
		request.send(null);
	}
}

var loader;
var newimage;
var imageInterval;

function isImageLoaded(){
	if(newimage.complete){
		// alert("complete");
		clearInterval(imageInterval);
		loader.style.display = "none";
	}
}

function removeAllChildren(ele){
	if ( ele.hasChildNodes() )
	{
		while ( ele.childNodes.length >= 1 )
		{
			ele.removeChild( ele.firstChild );       
		} 
	}
}

function updateEleNode(target, data){
		removeAllChildren(target);
		target.appendChild(data);
	// check that the target node is, in fact, a text node
	if(target.firstChild.nodeType == 3){
	}else{
		return false;
	}
}

function swapper(whichlink,state1,state2){
	if(!whichlink.getAttribute("id")) return false;
	var linkid = whichlink.getAttribute("id").substr(5);
	var id1 = state1 + "_" + linkid;
	var id2 = state2 + "_" + linkid;
	document.getElementById(id1).style.display='none';
	document.getElementById(id2).style.display='inline';
	
}

function prepareLinks(links){
	for (var i=0; i<links.length; i++){
		links[i].onmouseover = function(){
			return swapper(this,"norm","over");
		}
		links[i].onmouseout = function(){
			return swapper(this,"over","norm");
		}
		links[i].onclick = function(){
			projectLoadLinks(this);
			return false;
		}
	}
}

function projectLoadLinks(links){
			var id = null;
			var pid = null;
			var mylink = links.getAttribute("href");
			mylink = mylink.split("?");
			if(mydata = mylink[1].split("&")){
				var data1 = mydata[0];
			}else{
				var data1 = mydata;	
			}
			data1 = data1.split("=");
			if(data1[0] == "id"){
				id = data1[1];
			}else {
				pid = data1[1];
			}
			if(mydata[1]){
				var data2 = mydata[1];
				data2 = data2.split("=");
				if(data2[0] == "id"){
					id = data2[1];
				}else {
					pid = data2[1];
				}
			}
			if(pid == null){ pid = 1; }
			loadProject(id, pid);
			return false;	
}

function projectSubLinks(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("sublinks")) return false;
	var gallery = document.getElementById("sublinks");
	var links = gallery.getElementsByTagName("a");
	for (var i=0; i<links.length; i++){
		links[i].onclick = function(){
			projectLoadLinks(this);
			return false;
		}
	}
	return false;
}

function prepareSwapper(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("thumbcolumn3")) return false;
	if (!document.getElementById("thumbcolumn4")) return false;
	
	var thumbs = document.getElementById("thumbcolumn3");
	var links = thumbs.getElementsByTagName("a");
	prepareLinks(links);
	
	var thumbs2 = document.getElementById("thumbcolumn4");
	var links2 = thumbs2.getElementsByTagName("a");
	prepareLinks(links2);
}

function prepareSwapperFeature(){
	if (!document.getElementById) return false;
	if (!document.getElementById("link_1")) return false;
	var links = document.getElementById("link_1");
	links.onmouseover = function(){
		return swapper(this,"norm","over");
	}
	links.onmouseout = function(){
		return swapper(this,"over","norm");
	}
}

addLoadEvent(prepareSwapper);
addLoadEvent(prepareSwapperFeature);
addLoadEvent(projectSubLinks);
//-->