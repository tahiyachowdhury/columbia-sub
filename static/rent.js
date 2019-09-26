

$(document).ready(function(){

	$( "#enter_address" ).autocomplete({
       source: rentals
    });
    
	$("#submit_rental").click(function(){
		submitRental()
	})
	
	$("#enter_contact").keypress(function(e){
	    if(e.which == 13) {
	        submitRental()
	    }	
	});


	$('.jumbotron').click(function(){
  		window.location.replace("http://127.0.0.1:5000/")
	});

})


var display_rental = function(rental){
	//$("#rentals").empty()

	if(rentals.length == 0){
		var row = $("<div class='row'>")
		var col_rental = $("<div class='col-md-4'>")
		$(col_rental).append("No rentals")		
		$("#rentals").append(row)
	}else {

		var row = $("<div class='row bottom_row_padding'>")
		
		var col_address = $("<div class='col-md-4'>")
		$(col_address).append(rental["address"])
		$(row).append(col_address)

		var col_rooms = $("<div class='col-md-2'>")
		$(col_rooms).append(rental["rooms"])
		$(row).append(col_rooms)

		var col_rent = $("<div class='col-md-2'>")
		$(col_rent).append(rental["rent"])
		$(row).append(col_rent)


		var col_contact = $("<div class='col-md-3'>")
		$(col_contact).append(rental["contact"])
		$(row).append(col_contact)


		var id = rental["id"]
		var delete_button = $("<button class='btn btn-warning' data-id='"+id+"'>X</button>")
		
		$(delete_button).click(function(){
			    if(confirm("Are you sure you want to remove your listing?"))
				{				
    				var this_id = $(this).data("id")				
					delete_rental(this_id)
					alert('Removed');
				}
				else
				{
    				
				}
			
		})
		
		$(row).append(delete_button)
		var edit_button = $("<button class='btn btn-link' data-id='"+id+"'>edit</button>")
		
		$(edit_button).click(function(){

			var divHtml1 = $(col_address).text(); 
			var divHtml2 = $(col_rooms).text(); 
			var divHtml3 = $(col_rent).text(); 
			var divHtml4 = $(col_contact).text(); 

			var textBox1 = $("<div class='col-md-4'> <input id = 'enter_address'/> </div>");
			var textBox2 = $("<div class='col-md-2'> <input id = 'inpt enter_rooms'/> </div>");
			var textBox3 = $("<div class='col-md-2'> <input id = 'inpt enter_rent'/> </div>");
			var textBox4 = $("<div class='col-md-2'> <input id = 'inpt enter_contact'/> </div>");
			
			textBox1.find('input').val(divHtml1);
			textBox2.find('input').val(divHtml2);
			textBox3.find('input').val(divHtml3);
			textBox4.find('input').val(divHtml4);

			$(col_address).replaceWith(textBox1);
			$(col_rooms).replaceWith(textBox2);
			$(col_rent).replaceWith(textBox3);
			$(col_contact).replaceWith(textBox4);


			var saveButton = $("<div class='col-md-2'> <button class='btn btn-primary'>Save</button></div>")

			$(saveButton).click(function(){
			    
				var address = $(textBox1).find('input').val()
				var room = $.trim( $(textBox2).find('input').val() )
				var contact = $(textBox4).find('input').val()
				var rent = $(textBox3).find('input').val()

				if($.trim(address) == ""){
					alert("You must enter an address")
					$("#enter_address").val("")
					$("#enter_address").focus()
				}
				else if($.trim(contact) == ""){
					alert("You must enter an email address")
					$("#enter_contact").val("")
					$("#enter_contact").focus()
				}else if (room == ""){
					alert("You must enter the number of rooms")
					$("#enter_rooms").val("")
					$("#enter_rooms").focus() 
				}else if (!$.isNumeric(room)){ 
					alert("The # of rooms had to be a number!")
					$("#enter_rooms").focus()
				}else if (rent == ""){
					alert("You must enter the rent price")
					$("#enter_ rent").val("")
					$("#enter_rent").focus() 
				}else if (!$.isNumeric(rent)){ 
					alert("The rent price had to be a number!")
					$("#enter_rent").focus()
				}else{
	
				    var new_rental = {
					"address": address,
					"rooms": room,
					"rent": rent,
					"contact": contact,
					}

    				save_rental(new_rental)
    			}

			})

			

			$(delete_button).replaceWith(saveButton)
			$(edit_button).remove()
			textBox1.focus();

		})

		$(row).append(edit_button)
		$("#rentals").append(row)

	}
}

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
			
			var col_address = $("<div class='col-md-4'>")
			$(col_address).append(rental["address"])
			$(row).append(col_address)

			var col_rooms = $("<div class='col-md-2'>")
			$(col_rooms).append(rental["rooms"])
			$(row).append(col_rooms)

			var col_rent = $("<div class='col-md-2'>")
			$(col_rent).append(rental["rent"])
			$(row).append(col_rent)


			var col_contact = $("<div class='col-md-3'>")
			$(col_contact).append(rental["contact"])
			$(row).append(col_contact)


			var id = rental["id"]
			var delete_button = $("<button class='btn btn-warning' data-id='"+id+"'>X</button>")
			
			$(delete_button).click(function(){
				    if(confirm("Are you sure you want to remove your listing?"))
    				{				
        				var this_id = $(this).data("id")				
						delete_rental(this_id)
						alert('Removed');
    				}
    				else
    				{
        				
    				}
				
			})
			
			$(row).append(delete_button)
			var edit_button = $("<button class='btn btn-link' data-id='"+id+"'>edit</button>")
			
			$(edit_button).click(function(){

				var divHtml1 = $(col_address).text(); 
				var divHtml2 = $(col_rooms).text(); 
				var divHtml3 = $(col_rent).text(); 
				var divHtml4 = $(col_contact).text(); 

    			var textBox1 = $("<div class='col-md-4'> <input id = 'enter_address'/> </div>");
    			var textBox2 = $("<div class='col-md-2'> <input id = 'inpt enter_rooms'/> </div>");
    			var textBox3 = $("<div class='col-md-2'> <input id = 'inpt enter_rent'/> </div>");
    			var textBox4 = $("<div class='col-md-2'> <input id = 'inpt enter_contact'/> </div>");
    			
    			textBox1.find('input').val(divHtml1);
    			textBox2.find('input').val(divHtml2);
    			textBox3.find('input').val(divHtml3);
    			textBox4.find('input').val(divHtml4);

    			$(col_address).replaceWith(textBox1);
    			$(col_rooms).replaceWith(textBox2);
    			$(col_rent).replaceWith(textBox3);
    			$(col_contact).replaceWith(textBox4);


				var saveButton = $("<div class='col-md-2'> <button class='btn btn-primary'>Save</button></div>")

				$(saveButton).click(function(){
				    
					var address = $(textBox1).find('input').val()
					var room = $.trim( $(textBox2).find('input').val() )
					var contact = $(textBox4).find('input').val()
					var rent = $(textBox3).find('input').val()

					if($.trim(address) == ""){
						alert("You must enter an address")
						$("#enter_address").val("")
						$("#enter_address").focus()
					}
					else if($.trim(contact) == ""){
						alert("You must enter an email address")
						$("#enter_contact").val("")
						$("#enter_contact").focus()
					}else if (room == ""){
						alert("You must enter the number of rooms")
						$("#enter_rooms").val("")
						$("#enter_rooms").focus() 
					}else if (!$.isNumeric(room)){ 
						alert("The # of rooms had to be a number!")
						$("#enter_rooms").focus()
					}else if (rent == ""){
						alert("You must enter the rent price")
						$("#enter_ rent").val("")
						$("#enter_rent").focus() 
					}else if (!$.isNumeric(rent)){ 
						alert("The rent price had to be a number!")
						$("#enter_rent").focus()
					}else{
		
					    var new_rental = {
						"address": address,
						"rooms": room,
						"rent": rent,
						"contact": contact,
						}

	    				save_rental(new_rental)
	    			}

				})

				

				$(delete_button).replaceWith(saveButton)
				$(edit_button).remove()
    			textBox1.focus();

			})

			$(row).append(edit_button)
			$("#rentals").append(row)
		})

	}
}


var delete_rental = function(id){
	$.ajax({
	        type: "POST",
	        url: "delete_rental",                
	        dataType : "json",
	        contentType: "application/json; charset=utf-8",
	        data : JSON.stringify({"id": id}),
		    success: function(data, text){
		        var rental = data["rentals"]

		    },
		    error: function(request, status, error){
		    	console.log("Error");
		        console.log(request)
		        console.log(status)
		        console.log(error)

		    }
	    });	
}

var save_rental = function(new_rental){
	$.ajax({
	        type: "POST",
	        url: "save_rental",                
	        dataType : "json",
	        contentType: "application/json; charset=utf-8",
	        data : JSON.stringify(new_rental),
		    success: function(data, text){

		        var rental = data["rentals"]
				display_rental(rental[rental.length - 1])
				alert('Successfully added');
				
				$("#enter_address").val("")
				$("#enter_rooms").val("")
				$("#enter_contact").val("")
				$("#enter_rent").val("")
				$("#enter_address").focus()

		    },
		    error: function(request, status, error){
		    	console.log("Error");
		        console.log(request)
		        console.log(status)
		        console.log(error)

		    }
	    });	
}

var submitRental = function(edit){
	var contact = $("#enter_contact").val()
	var address = $("#enter_address").val()
	var room = $.trim( $("#enter_rooms").val() )
	var rent = $.trim( $("#enter_rent").val() )

	if($.trim(address) == ""){
		alert("You must enter an address")
		$("#enter_address").val("")
		$("#enter_address").focus()
	}
	else if($.trim(contact) == ""){
		alert("You must enter an email address")
		$("#enter_contact").val("")
		$("#enter_contact").focus()
	}else if (room == ""){
		alert("You must enter the number of rooms")
		$("#enter_rooms").val("")
		$("#enter_rooms").focus() 
	}else if (!$.isNumeric(room)){ 
		alert("The # of rooms had to be a number!")
		$("#enter_room").focus()
	}else if (rent == ""){
		alert("You must enter the rent price")
		$("#enter_ rent").val("")
		$("#enter_rent").focus() 
	}else if (!$.isNumeric(rent)){ 
		alert("The rent price had to be a number!")
		$("#enter_rent").focus()
	}else{
		
		var new_rental = {
			"address": address,
			"rooms": room,
			"rent": rent,
			"contact": contact,
		}

	    save_rental(new_rental)

	}
}


