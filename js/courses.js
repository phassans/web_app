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

	$(document.body).on('click', ':button, .DELETE_BTN', function(e) {
		console.log(this);
		var $this = $(this)
		, $tr = $this.closest('tr')
		, FIRSTNAME = $tr.find('.REG_FIRSTNAME').text()
		, LASTNAME = $tr.find('.REG_LASTNAME').text()
		, EMAIL = $tr.find('.REG_EMAIL').text()
		, obj = {FIRSTNAME : FIRSTNAME, LASTNAME : LASTNAME, EMAIL : EMAIL};
		deleteInventory(obj);
	});
});

function deleteInventory(obj) {

	ajaxObj = {  
			type: "DELETE",
			url: "http://localhost:7001/StudentLab/api/courses/",
			data: JSON.stringify(obj), 
			contentType:"application/json",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			},
			success: function(data) {
				console.log(data);
				$('#delete_response').text( data[0].MSG );
			},
			complete: function(XMLHttpRequest) {
				console.log( XMLHttpRequest.getAllResponseHeaders() );
				getInventory();
			}, 
			dataType: "json" //request JSON
	};

	return $.ajax(ajaxObj);
}

function getInventory() {
	$.getJSON( "http://localhost:7001/StudentLab/api/courses", function( data ) {
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