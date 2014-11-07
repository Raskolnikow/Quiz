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

function showCard(event) {
	$.ajax({
		url: "/show_card",

		data: {
			id: 123
		},

		type: "POST",

		dataType: "json",

		success: function(json) {
			var cnt_frage = document.getElementById("fach_1_frage");
			var cnt_antwort = document.getElementById("fach_1_antwort");
			cnt_frage.innerHTML = json.frage;
			cnt_antwort.innerHTML = json.antwort;
		},

		error: function(xhr, status, errorThrown) {
			alert("Sorry, there was a problem");
		},

		complete: function(xhr, status) {

		}
	});
}

$(document).on('click', '#list_fach', showCard);

$(document).on('click', '#btn_back', function(event) {
	var cnt_antwort = document.getElementById("fach_1_antwort");
	cnt_antwort.style.display = "none";
});

$(document).on('click', '#btn_show', function(event) {
	var cnt_antwort = document.getElementById("fach_1_antwort");
	cnt_antwort.style.display = "block";
});

$(document).on('click', '#btn_next', function(event) {
	var cnt_antwort = document.getElementById("fach_1_antwort");
	cnt_antwort.style.display = "none";
	showCard();
});
