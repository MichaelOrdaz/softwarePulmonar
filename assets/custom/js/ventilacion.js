var myChart;

$(function(){
	//verificamos que exista sesion
	$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: {fn: 'getPaciente'}
	}).done(function(json){
		if( typeof json[0] === 'undefined'  ){
			window.location.href = "poderMecanico";
		}
	});


	var ctx = document.querySelector("#radarPaciente");
	var myChart = new Chart(ctx, {
    	type: 'radar',
    	data: {
		    labels: ['Poder Mecánico', 'FiO2', 'Volumen Tidal', 'Driving Pressure', 'Presión Pico', 'Presión Meseta', 'PEEP'],
		    datasets: [{
		    	label: "Recomendado",
		        data: [13, 60, 9, 15, 35, 30, 5],
		        backgroundColor: [
	            	'rgba(64, 192, 8, 0)'
	            ],
	            borderColor: [
	            	'rgba(64, 192, 8, 1)'
	            ],
	            borderWidth: 1
		    }]
		},
    	options: {
    		title: {
            	display: true,
            	text: 'Reporte del Paciente'
        	},
        	scale: {
		        // Hides the scale
		        display: true
		    }
    	}
	});


	$('#form-fio2').submit( ev=>{
		ev.preventDefault();
		var data = $('#form-fio2').serializeArray();
		data.push({name: 'fn', value: 'saveFio'});
		console.log(data);

		$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: data
		}).done(function(json){
			console.log("success");
			console.log(json);
			if( json.filas > 0 ){

				$.ajax({
				url: '../modelo/Peticiones',
				type: 'POST',
				dataType: 'json',
				data: {'fn': 'getPaciente'}
				}).done(function(json){
					//aqui debo de rescatar todo y hacer todas las operaciones.

				}).fail(function() {
					console.log("error");
				
				});
			}

		}).fail(function() {
			console.log("error");
		});
	});//endSubmit
	

});