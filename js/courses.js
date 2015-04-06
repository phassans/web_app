/**
 * js file for post.html
 * Please use modern web browser as this file will not attempt to be
 * compatible with older browsers. Use Chrome and open javascript console
 * or Firefox with developer console.
 * 
 * jquery is required
 */
$(document).ready(function() {
	getInventory();
});
function getInventory() {
	$.getJSON( "http://"+host+"StudentLab/api/courses", function( data ) {
		var jsondata = data.data;
		var html_string = "<tr><td>CODE</td><td>NAME</td><td>DEPT</td><td>DESCRIPTION</td><td>PROFESSOR</td><td>PROFESSOR_EMAIL</td><td>SEATS</td><td>TIME</td>" +
		"<td>REGDATE</td><td>STARTDATE</td><td>INFO</td></tr>";
		for(var i = 0; i < jsondata.length; i++) {
			html_string = html_string + templateGetInventory(jsondata[i]);
		}
		$('#get_inventory').html("<table border='1'>" + html_string + "</table>");
	});
}

function templateGetInventory(param) {
	return '<tr>' +
	'<td class="REG_CODE">' + param.CODE + '</td>' +
	'<td class="REG_NAME">' + param.NAME + '</td>' +
	'<td class="REG_DESCRIPTION">' + param.DEPT + '</td>' +
	'<td class="REG_DESCRIPTION">' + param.DESCRIPTION + '</td>' +
	'<td class="REG_PROFESSOR">' + param.PROFESSOR + '</td>' +
	'<td class="REG_PROFESSOR">' + param.PROFESSOR_EMAIL + '</td>' +
	'<td class="REG_PROFESSOR">' + param.SEATS + '</td>' +
	'<td class="REG_TIME">' + param.TIME + '</td>' +
	'<td class="REG_REGDATE">' + param.REGDATE + '</td>' +
	'<td class="REG_STARTDATE">' + param.STARTDATE + '</td>' +
	'<td class="REG_INFO">' + param.INFO + '</td>' +
	'</tr>';
}