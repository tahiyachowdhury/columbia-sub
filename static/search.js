

$(document).ready(function(){
	
	$("#submit_search").click(function(){
		var search_text = $("#search").val()
  
        var selectedRoom =  $('#room').find(":selected").text();

        var selectedPrice= $('#price').find(":selected").text();
        	
		search_rental(search_text, selectedRoom, selectedPrice)
	})

	display_rental_list(rentals)	

	$('.jumbotron').click(function(){
  		window.location.replace("http://127.0.0.1:5000/")
	});
})



var display_rental_list = function(rentals){
	$("#rentals").empty()

	if(rentals.length == 0){
		var row = $("<div class='row'>")
		var col_rental = $("<div class='col-md-4'>")
		$(col_rental).append("No rentals")		
		$("#rentals").append(row)
	}else {
		rentals.reverse()

		$.each(rentals, function(i, rental){
			
			var row = $("<div class='row bottom_row_padding'>")

			var image = rental["image"]

			var col_img = $("<img class='col-md-2' id='image' src=" +image+ " width='10' height='80'>")
			
			$(row).append(col_img)


			var col_address = $("<div class='col-md-4'>")
			$(col_address).append(rental["address"])
			$(row).append(col_address)

			var col_rooms = $("<div class='col-md-2'>")
			$(col_rooms).append(rental["rooms"])
			$(row).append(col_rooms)

			var col_rent = $("<div class='col-md-2'>")
			$(col_rent).append(rental["rent"])
			$(row).append(col_rent)

			var col_contact = $("<div class='col-md-2'>")
			$(col_contact).append(rental["contact"])
			$(row).append(col_contact)

			$("#rentals").append(row)
			$("#rentals").append('<br>')
		})

	}
}

var search_rental = function(search_text, selectedRoom, selectedPrice){

	$.ajax({
        type: "POST",
        url: "search_rental",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify([search_text, selectedRoom, selectedPrice]),
	    success: function(data, text){
	        var rental = data["search_res"]
			display_rental_list(rental)
	    },
	    error: function(request, status, error){
	    	console.log("Error");
	        console.log(request)
	        console.log(status)
	        console.log(error)
	    }
    });	
}





