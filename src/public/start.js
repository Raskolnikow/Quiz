var ajax = new XMLHttpRequest();
if(ajax == null)
	alert('AJAX not supported!');

function sendData() {
	var frage = document.getElementById("frage");
	var antwort = document.getElementById("antwort");

	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4) {
			if(ajax.status == 200) {
				var res = eval("(" + ajax.responseText + ")");
				antwort.innerHTML = res.frage;
			}
		}
	}

	ajax.open("POST", "192.168.161.124:8080");
	ajax.setRequestHeader("Content-Type", "application/json");

	ajax.send(JSON.stringify({"frage" : frage.value}));

}