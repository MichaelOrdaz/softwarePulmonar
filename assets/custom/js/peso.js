$(function(){

	setTimeout(function(){
		var entrada = document.querySelector('#pesoPredicho #peso');
		entrada.focus();
	}, 1000);

	$('#pesoPredicho').submit(function(ev){
		ev.preventDefault();
		var datos = $(this).serializeArray();
		document.querySelector("#pesoPredicho").reset();

		datos.push({name: 'fn', value: 'paso1'}); 
		console.log( datos );
		/*
		tengo los datos hago un ajax para guardar en BD
		*/
		$.ajax({
			url: '../modelo/Peticiones',
			type: 'POST',
			dataType: 'json',
			data: datos,
			beforeSend: function(){
				console.log("esperando");
				swal("Espere por favor");
			}
		}).done(function(json){
			//console.log("success");
			window.location.href = "poderMecanico";
		}).fail(function() {
			//console.log("error");
		});
		
		
	});
});