$(document).ready(function() {
	getInventory();
});

function getInventory() {
	$.getJSON( "http://"+host+"StudentLab/api/students", function( data ) {
		var jsondata = data.data;
		var html_string = "<tr><td>FIRSTNAME</td><td>LASTNAME</td><td>GENDER</td><td>DOB</td><td>EMAIL</td><td>PHONE</td><td>ADDRESS</td><td>CITY</td>" +
				"<td>STATE</td><td>ZIP</td><td>COUNTRY</td></tr>";
		for(var i = 0; i < jsondata.length; i++) {
			html_string = html_string + templateGetInventory(jsondata[i]);
		}
		$('#get_inventory').html("<table border='1'>" + html_string + "</table>");
	});
}

function templateGetInventory(param) {
	return '<tr>' +
	'<td class="REG_FIRSTNAME">' + param.FIRSTNAME + '</td>' +
	'<td class="REG_LASTNAME">' + param.LASTNAME + '</td>' +
	'<td class="REG_GENDER">' + param.GENDER + '</td>' +
	'<td class="REG_DOB">' + param.DOB + '</td>' +
	'<td class="REG_EMAIL">' + param.EMAIL + '</td>' +
	'<td class="REG_PHONE">' + param.PHONE + '</td>' +
	'<td class="REG_ADDRESS">' + param.ADDRESS + '</td>' +
	'<td class="REG_CITY">' + param.CITY + '</td>' +
	'<td class="REG_STATE">' + param.STATE + '</td>' +
	'<td class="REG_ZIP">' + param.ZIP + '</td>' +
	'<td class="REG_COUNTRY">' + param.COUNTRY + '</td>' +
	'</tr>';
}