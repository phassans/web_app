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
			url: "http://localhost:7001/StudentLab/api/students/",
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
	$.getJSON( "http://localhost:7001/StudentLab/api/students", function( data ) {
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