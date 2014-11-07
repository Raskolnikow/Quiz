var ajax = new XMLHttpRequest();
if(ajax == null)
	alert('AJAX not supported!');

function sendData() {
	var frage = document.getElementById("frage");
	var antwort = document.getElementById("antwort");

	if(frage.value == "" || antwort.value == "") return;


	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4) {
			if(ajax.status == 200) {
				var res = eval("(" + ajax.responseText + ")");
				//antwort.innerHTML = res.frage;
			}
		}
	}

	//ajax.open("POST", "192.168.161.124:8080");
	ajax.open("POST", "/new");
	ajax.setRequestHeader("Content-Type", "application/json");

	ajax.send(JSON.stringify({"frage" : frage.value, "antwort": antwort.value}));

}

$(document).on('click', "#ref_to_learn", function() {

	document.getElementById("fach_1_li_count").innerHTML = Math.floor((Math.random() * 10) + 1);

	/*ajax.onreadystatechange = function() {
		if(ajax.readyState == 4) {
			if(ajax.status == 200) {
				$("fach_1_li_count").value = 0;
			}
		}
	}*/
});


$(document).on('click', '#list_fach', function(event) {
	$.ajax({
		url: "/show_card",

		data: {
			id: 123
		},

		type: "POST",

		dataType: "json",

		success: function(json) {
			var cnt = document.getElementById("fach_1_content");
			cnt.innerHTML = "<label>Frage:</label>";
			cnt.innerHTML += "<p>" + json.frage + "</p>";
			cnt.innerHTML += "<label>Antwort:</label>";
			cnt.innerHTML += "<p>" + json.antwort + "</p>";
		},

		error: function(xhr, status, errorThrown) {
			alert("Sorry, there was a problem");
		},

		complete: function(xhr, status) {

		}
	});
});