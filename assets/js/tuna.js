var tuna = document.getElementById("tuna");
var posts = [];
var postlist = '';

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
	for (var i = 0; i < data.length; i++) {
		posts.push(data[i].name);
		postlist += '<li class="table-view-cell"><a class="navigate-right" href="javascript:void(0)" onclick="showPost(' + i + ')">' + data[i].name + '</a></li>';
	}
	tuna.innerHTML = postlist;
};

var showPost = function(id) {
	AJAX("posts/" + encodeURIComponent(posts[id]), function(data) {
		tuna.innerHTML = markdown.toHTML(data);
	});
};

var backHome = function() {
	tuna.innerHTML = postlist;
};
