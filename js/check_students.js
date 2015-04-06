$(document).ready(function() {
	$(document.body).on('click', ':button, .DELETE_BTN', function(e) {
		var email = $('#EMAIL').val();
		getInventory(email);
	});
});

function getInventory(email) {
	$.getJSON( "http://"+host+"StudentLab/api/students/"+email, function() {
	})
	.success(function(data) {
		if(data.code==200){
			$("#fail-msg").hide();
			$('#success-msg').html("Successfully retrieved courses for the student");
			$("#success-msg").show();
			var jsondata = data.data;
			var html_string = "<tr><td>COURSE NAME</td><td>COURSE DESCRIPTION</td></tr>";
			for(var i = 0; i < jsondata.length; i++) {
				html_string = html_string + templateGetInventory(jsondata[i]);
			}
			$('#get_inventory').html("<table border='1'>" + html_string + "</table>");
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
	'<td class="REG_FIRSTNAME">' + param.NAME + '</td>' +
	'<td class="REG_LASTNAME">' + param.DESCRIPTION + '</td>' +
	'</tr>';
}