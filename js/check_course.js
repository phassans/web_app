$(document).ready(function() {
	$(document.body).on('click', ':button, .DELETE_BTN', function(e) {
		var code = $('#CODE').val();
		getInventory(code);
	});
});

function getInventory(code) {
	$.getJSON( "http://localhost:7001/StudentLab/api/courses/"+code, function() {
	})
	.success(function(data) {
		if(data.code==200){
			$("#fail-msg").hide();
			
			$('#seats-reg-msg').html("Total number of seats registered : "+data.seats_registered);
			$("#seats-reg-msg").show();
			
			$('#avail-seats-msg').html("Total number of available seats : "+data.available_seats);
			$("#avail-seats-msg").show();
			
			$('#regdate-msg').html("Last day for registration : "+data.last_day_for_registration);
			$("#regdate-msg").show();
			
			$('#success-msg').html("Successfully retrieved courses for the student");
			$("#success-msg").show();
			var jsondata = data.data;
			var html_string = "<tr><td>FIRSTNAME</td><td>LASTNAME</td><td>EMAIL</td></tr>";
			for(var i = 0; i < jsondata.length; i++) {
				html_string = html_string + templateGetInventory(jsondata[i]);
			}
			$('#get_inventory').html("<table border='1'>" + html_string + "</table>");
		}else if(data.code==400){
			$('#fail-msg').html("No courses for the student");
			$("#fail-msg").show();
			$("#success-msg").hide();
			$("#regdate-msg").hide();
			$("#avail-seats-msg").hide();
			$("#seats-reg-msg").hide();
		}
	})
	.error(function(data) {
		$('#fail-msg').html("No courses for the student");
		$("#fail-msg").show();
		$("#success-msg").hide();
	});
}

function templateGetInventory(param) {
	return '<tr>' +
	'<td class="REG_FIRSTNAME">' + param.FIRSTNAME + '</td>' +
	'<td class="REG_LASTNAME">' + param.LASTNAME + '</td>' +
	'<td class="REG_LASTNAME">' + param.EMAIL + '</td>' +
	'</tr>';
}