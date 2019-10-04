

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

	if(rentals.length == 0){
		var row = $("<div class='row'>")
		var col_rental = $("<div class='col-md-4'>")
		$(col_rental).append("No rentals")		
		$("#rentals").append(row)
	}else {

		var row = $("<div class='row bottom_row_padding'>")

		var image = rental["image"]
		var col_img = $("<img class='col-md-2' id='image' src=" +image+ " width='10' height='80'>")
		$(row).append(col_img)
		
		var col_address = $("<div class='col-md-4'>")
		$(col_address).append(rental["address"])
		$(row).append(col_address)

		var col_rooms = $("<div class='col-md-1'>")
		$(col_rooms).append(rental["rooms"])
		$(row).append(col_rooms)

		var col_rent = $("<div class='col-md-1'>")
		$(col_rent).append(rental["rent"])
		$(row).append(col_rent)

		var gender_col = $("<div class='col-md-1'>")
		$(gender_col).append(rental["gender"])
		$(row).append(gender_col)

		var col_contact = $("<div class='col-md-2'>")
		$(col_contact).append(rental["contact"])
		$(row).append(col_contact)


		var id = rental["id"]
		var delete_button = $("<button class='btn btn-warning delete' data-id='"+id+"'>X</button>")
		
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
		var edit_button = $("<button class='btn btn-link edit' data-id='"+id+"'>edit</button>")
		
		$(edit_button).click(function(){
			var divHtml1 = $(col_address).text(); 
			var divHtml2 = $(col_rooms).text(); 
			var divHtml3 = $(col_rent).text(); 

			var divHtml4 = $(col_contact).text(); 

			var textBox1 = $("<div class='col-md-4'> <input id = 'enter_address' /> </div>");
			var textBox2 = $("<div class='col-md-1'> <input id = 'inpt enter_rooms' style='width:50px;'/> </div>");
			var textBox3 = $("<div class='col-md-1'> <input id = 'inpt enter_rent'style='width:80px;'/> </div>");
			var gender_new = $("<div class='col-md-1'> <select id='gender_edit'> <option value='male'>Male</option> <option value='female'>Female</option></select></div>")
			var textBox4 = $("<div class='col-md-2'> <input id = 'inpt enter_contact'/> </div>");

			
			textBox1.find('input').val(divHtml1);
			textBox2.find('input').val(divHtml2);
			textBox3.find('input').val(divHtml3);
			textBox4.find('input').val(divHtml4);

			$(col_address).replaceWith(textBox1);
			$(col_rooms).replaceWith(textBox2);
			$(col_rent).replaceWith(textBox3);
			$(gender_col).replaceWith(gender_new);
			$(col_contact).replaceWith(textBox4);


			var saveButton = $("<div class='col-md-2 save'> <button class='btn btn-primary'>Save</button></div>")

			$(saveButton).click(function(){


			    
				var address = $(textBox1).find('input').val()
				var room = $.trim( $(textBox2).find('input').val() )
				var contact = $(textBox4).find('input').val()
				var rent = $(textBox3).find('input').val()
				var gender = document.getElementById('gender_edit').value

				$(col_img).remove()
				$(saveButton).remove()
				$(textBox1).remove()
				$(textBox2).remove()
				$(textBox3).remove()
				$(textBox4).remove()
				$(gender_new).remove()

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
					
					var image = rental["image"]
				    var new_rental = {
				    "image": image,
					"address": address,
					"rooms": room,
					"rent": rent,
					"gender": gender,
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



var delete_rental = function(id){
	$.ajax({
	        type: "POST",
	        url: "delete_rental",                
	        dataType : "json",
	        contentType: "application/json; charset=utf-8",
	        data : JSON.stringify({"id": id}),
		    success: function(data, text){
		        var rental = data["rentals"]
		        	$("#rentals").empty()

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

				alert('Successfully added');


				display_rental(rental[rental.length - 1])
				
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
	var image = $("#image").prop('files')[0]["name"];
	var image_url = "static/pics/" + image
	var contact = $("#enter_contact").val()
	var address = $("#enter_address").val()
	var room = $.trim( $("#enter_rooms").val() )
	var rent = $.trim( $("#enter_rent").val() )
	var gender = document.getElementById('gender').value


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

			"image": image_url,
			"address": address,
			"rooms": room,
			"rent": rent,
			"gender": gender,
			"contact": contact,
		}

	    save_rental(new_rental)

	}
}


