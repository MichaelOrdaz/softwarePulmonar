$(function(){

	$('#pesoPredicho').submit(function(ev){
		ev.preventDefault();
		var datos = $(this).serializeArray();
		console.log( datos );
		document.querySelector("#pesoPredicho").reset();


		
		window.location.href = "poderMecanico";
	});
});