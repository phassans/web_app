/**
 * js file for post.html
 * Please use modern web browser as this file will not attempt to be
 * compatible with older browsers. Use Chrome and open javascript console
 * or Firefox with developer console.
 * 
 * jquery is required
 */
$(document).ready(function() {
	//console.log("ready");
	
	var $post_example = $('#post_example');
	/**
	 * This is for the 2nd Submit button "Submit v2"
	 * It will do the same thing as Submit above but the api
	 * will process it in a different way.
	 */
	$('#submit_it2').click(function(e) {
		//console.log("submit button has been clicked");
		e.preventDefault(); //cancel form submit
		
		var jsObj = $post_example.serializeObject()
			, ajaxObj = {};
		
		//console.log(jsObj);
		
		ajaxObj = {  
			type: "POST",
			url: "http://"+host+"StudentLab/api/courses", 
			data: JSON.stringify(jsObj), 
			contentType:"application/json",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data) {
				if(data[0].code == 200) {
					$('#success-msg').text( data[0].message );
					$("#success-msg").show();
					$("#fail-msg").hide();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				var html_string = "";
				var jsondata = JSON.parse(jqXHR.responseText);
				for(var i = 0; i < jsondata.length; i++) {
					html_string =html_string + "Error "+(i+1)+". "+jsondata[i].message + "<br>";
				}
				$('#fail-msg').html(html_string);
				$("#fail-msg").show();
				$("#success-msg").hide();
			},
			dataType: "json" //request JSON
		};
		
		$.ajax(ajaxObj);
	});
});
