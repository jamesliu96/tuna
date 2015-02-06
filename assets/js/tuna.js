var tuna = document.getElementById("tuna");
var tunara = document.getElementById("tunara");
var posts = [];

var AJAX = function(url, callback) {
	var xhr = XHR();
	if (!xhr) return;
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200 && xhr.status != 304) {
			return;
		}
		callback(xhr.responseText);
	}
	xhr.open("GET", url, true);
	if (xhr.readyState == 4) return;
	xhr.send(null);
};

var XHR = function() {
	var xhr;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		var shitie = ["Msxml3.XMLHTTP", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
		for (var i = 0, len = shitie.length; i < len; i++) {
			try {
				xhr = new ActiveXObject(shitie[i]);
			} catch (e) {
				continue;
			}
		}
	}
	return xhr;
};



var readPosts = function(list) {
	var data = (Object.prototype.toString.call(list.data) === "[object Array]") ? list.data : [];
	var temp = '';
	for (var i = 0; i < data.length; i++) {
		posts.push(data[i].name);
		temp += '<p><a href="javascript:void()" onclick="showPost(' + i + ')">' + data[i].name + '</a></p>';
	}
	tuna.innerHTML = temp;
};

var showPost = function(id) {
	AJAX("/_post/" + encodeURIComponent(posts[id]), function(data) {
		tunara.innerHTML = markdown.toHTML(data);
	});
};