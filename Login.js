$(document).ready(function () {

	$("#registration").hide();
	$("#regerr").hide();

	$("#reg").click(function(){

		
		$("#login").hide();
		$("#registration").show();
	});

	function cansel() {
		$("#user1, #password1, #password2").val("")
		$("#registration").hide();
		$("#login").show();
		$("#regerr").text("Password not confirmed!!!").hide();
	}
	
$("#cansel").click(cansel);

$("#reg1").click(function () {

	let user=$("#user1").val();
	console.log(user);
	let password=$("#password1").val();
	let passwordConfirm=$("#password2").val();
	if(password!=passwordConfirm){
		alert("error")
	}
		else {
		
			let obj={
				user:user,
				password:password
			}
			$.post("/register",obj,(data)=>{
				console.log(data);
				$("#regerr").text(data).show();
				setTimeout(cansel,5000);
			
			})
		}
	
  })


});