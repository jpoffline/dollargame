/*
See
https://forums.asp.net/t/2104448.aspx?How+to+connect+two+div+dynamically+by+connecting+line+

*/

function connect(div1, div2, color, thickness) {
	var off1 = getOffset(div1);
	var off2 = getOffset(div2);
	console.log(off1);
	// bottom right
	var x1 = off1.left + off1.width/2;
	var y1 = off1.top  + off1.height/2;
	// top right
	var x2 = off2.left + off2.width/2;
	var y2 = off2.top  + off2.height/2;
	
	// distance
	var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
	// center
	var cx = ((x1 + x2) / 2) - (length / 2);
	var cy = ((y1 + y2) / 2) - (thickness / 2);
	// angle
	var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
	// make hr
	var htmlLine = "<div class='node-connector' style='padding:0px; margin:0px; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
	//
	
	document.body.innerHTML += htmlLine;
}

function getOffset(el) {
	var rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.pageXOffset,
		top: rect.top + window.pageYOffset,
		width: rect.width || el.offsetWidth,
		height: rect.height || el.offsetHeight
	};
}

function connectDivs(divid1, divid2){
	var div1 = document.getElementById(divid1);
	var div2 = document.getElementById(divid2)
	connect(div1, div2, "#0F0", 5);
}

