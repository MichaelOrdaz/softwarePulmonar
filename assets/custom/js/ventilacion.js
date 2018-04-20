var myChart;

$(function(){
	$('[data-toggle="tooltip"]').tooltip();
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
		    	label: "Limite Min Recomendado",
		        data: [13, 21, 8, 15, 35, 29, 5],
		        backgroundColor: [
	            	'transparent'
	            ],
	            borderColor: [
	            	'rgba(0, 255, 0, 1)'
	            ],
	            borderWidth: 1,
	            radius: 6
		    },
		    {
		    	label: "Limite Max Recomendado",
		        data: [13, 60, 8, 15, 35, 29, 5],
		        backgroundColor: [
	            	'transparent'
	            ],
	            borderColor: [
	            	'rgba(0, 0, 255, 1)'
	            ],
	            borderWidth: 1,
	            radius: 6
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

	$('#fio2').change((ev)=>{
		var valor = $('#fio2').val();
		//console.log( valor );
		if( valor > 60 ){
			alertify.error('Fracción inspirada alta');
			//$("#formPoderMecanico :submit").prop('disabled', true);
			$('#fio2').parent().siblings('div.alert').text('Fracción inspirada alta');
			$('#fio2').parent().siblings('div.alert').slideDown();
		}
		else{
			//$("#formPoderMecanico :submit").prop('disabled', false);
			$('#fio2').parent().siblings('div.alert').empty();
			$('#fio2').parent().siblings('div.alert').slideUp();
		}
	});


	$('#form-fio2').submit( ev=>{
		ev.preventDefault();
		var data = $('#form-fio2').serializeArray();
		data.push({name: 'fn', value: 'saveFio'});
		//console.log(data);
		$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: data,
		beforeSend: function(){
			swal({
		  		title: 'Espere por favor',
		  		onOpen: () => {
		    	swal.showLoading()
		  	},
		  	allowOutsideClick: false
			})
		}
		}).done(function(json){
			//console.log("success");
			//console.log(json);
			if( json.filas > 0 ){
				$.ajax({
				url: '../modelo/Peticiones',
				type: 'POST',
				dataType: 'json',
				data: {'fn': 'getPaciente'}
				}).done(function(resp){
					//aqui debo de rescatar todo y hacer todas las operaciones.
					//console.log(resp);
					var poderMecanico = resp[0].poderMecanico;
					var fio2 = resp[0].fio2;
					var tidal= resp[0].vt2;
					var driving = (resp[0].presionMeseta - resp[0].peep);
					var pico = resp[0].presionPico;
					var presionMeseta = resp[0].presionMeseta;
					var peep = resp[0].peep;

					var radarPaciente = {
				    	label: "Paciente",
				        data: [poderMecanico, fio2, tidal, driving, pico, presionMeseta, peep],
				        backgroundColor: [
			            	'rgba(0, 0, 0, .1)'
			            ],
			            borderColor: [
			            	'rgba(0, 0, 0, 1)'
			            ],
			            borderWidth: 1,
			            radius: 2
					}
				    myChart.data.datasets[2] = radarPaciente;
				    myChart.update();
					
				    var table = '<table class="table table-sm table-bordered my-3">'+
						'<tbody>'+
							'<tr>'+
								'<th>Poder Mecánico</th>'+
								'<td>'+poderMecanico+'</td>'+
								'<th>FIO2</th>'+
								'<td>'+ fio2 +'</td>'+
								'<th>Volumen Tidal</th>'+
								'<td>'+tidal+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th>Driving Pressure</th>'+
								'<td>'+driving+'</td>'+
								'<th>Presión Pico</th>'+
								'<td>'+pico+'</td>'+
								'<th>Presión Meseta</th>'+
								'<td>'+presionMeseta+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th>PEEP</th>'+
								'<td>'+peep+'</td>'+
							'</tr>'+
						'</tbody>'+
					'</table>';

					$('#tablaDatos').empty();
					$('#tablaDatos').html(table);

					document.querySelector("#form-fio2").reset();
					$("#form-fio2 div.alert").slideUp();
					swal.close();

				}).fail(function() {
					console.log("error ajax interno");
					swal.close();
					swal('Upps!', 'Lo sentimos ocurrio un error, intenta nuevamente, gracias', 'error');	
				});
			}
			else{
				alertify.message('No se hizo ningún cambio');
				swal.close();
			}
		}).fail(function() {
			swal.close();
			swal('Upps!', 'Lo sentimos ocurrio un error, intenta nuevamente, gracias', 'error');
			console.log("error ajax externo");
		});
	});//endSubmit
	

	$('#v-pills-profile-tab').click(ev=>{

		$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: {'fn': 'getAllPacientes'}
		}).done(function(resp){
			console.log(resp);
			$('#tableHistory tbody').empty();
			
			if ( $.fn.dataTable.isDataTable( '#tableHistory' ) ) {
				$('#tableHistory').DataTable().destroy();
			}
			
			var body = "";
			resp.forEach(pac=>{
				body += '<tr>'
					+'<td>'+pac.peso+'</td>'
					+'<td>'+pac.estatura+'</td>'
					+'<td>'+pac.genero+'</td>'
					+'<td>'+pac.frecuenciaRespiratoria+'</td>'
					+'<td>'+pac.vt+'</td>'
					+'<td>'+pac.presionPico+'</td>'
					+'<td>'+pac.presionMeseta+'</td>'
					+'<td>'+pac.peep+'</td>'
					+'<td>'+pac.fio2+'</td>'
					+'<td>'+pac.poderMecanico+'</td>'
					+'<td>'+pac.vt2+'</td>'
					+'<td>'+pac.create_at+'</td>'
				+'</tr>';
			});

			$('#tableHistory tbody').html(body);
			
			$('#tableHistory').DataTable({
				"language": {
                	"url": "../assets/DataTables/Spanish.json"
            	},
        		"order": [[ 11, "desc" ]]
    		});



		}).fail(function() {
			console.log("error");
			swal('Upps!', 'Lo sentimos ocurrio un error, intenta nuevamente, gracias', 'error');	
		});


	});

});