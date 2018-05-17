var myChart;

$(function(){

	if(window.location.hash === "#historial"){
		console.log('mostrar historial');
		$('#v-pills-profile-tab').tab('show');
	}


	$('[data-toggle="tooltip"]').tooltip();
	//verificamos que exista sesion
	/*
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
	*/

	var ctx = document.querySelector("#radarPaciente");
	var myChart = new Chart(ctx, {
    	type: 'radar',
    	data: {
		    labels: ['Poder Mecánico', 'FiO2', 'Volumen Tidal', 'Driving Pressure', 'Presión Pico', 'Presión Meseta'],
		    datasets: [
		    /*{
		    	label: "Limite Min Recomendado",
		        data: [13, 21, 8, 15, 35, 29],
		        backgroundColor: [
	            	'transparent'
	            ],
	            borderColor: [
	            	'rgba(0, 255, 0, 1)'
	            ],
	            borderWidth: 1,
	            radius: 6,
	            pointRadius: 6,
			    pointBorderWidth: 3,
			    pointBackgroundColor: "rgba(0,100,0,.5)",
			    pointBorderColor: "rgba(0,200,0,0.6)",
			    pointHoverRadius: 10
		    },*/
		    {
		    	label: "Limite Recomendado",
		        data: [13, 60, 8, 15, 35, 29],
		        backgroundColor: [
	            	'transparent'
	            ],
	            borderColor: [
	            	'rgba(0, 0, 255, 1)'
	            ],
	            borderWidth: 1,
	            radius: 6,
	            pointRadius: 6,
			    pointBorderWidth: 3,
			    pointBackgroundColor: "rgba(0,0,100, .5)",
			    pointBorderColor: "rgba(0,0,200,0.6)",
			    pointHoverRadius: 10
		    },
		    {
		    	label: "PEEP > 4cmH2O",
		        data: [5, 5, 5, 5, 5, 5],
		        backgroundColor: [
	            	'transparent'
	            ],
	            borderColor: [
	            	'rgba(200, 100, 50, 1)'
	            ],
	            borderWidth: 1,
	            radius: 1,
	            pointRadius: 2,
			    pointBorderWidth: 2,
			    pointBackgroundColor: "rgba(100,0,0,.5)",
			    pointBorderColor: "rgba(200,0,0,0.6)",
			    pointHoverRadius: 4
		    }]
		},
    	options: {
    		title: {
            	display: true,
            	text: 'Reporte del Paciente'
        	},
			scale: {
			    ticks: {
			      beginAtZero: true,
			      //min: 0,
			      //max: 100,
			      //stepSize: 20
			    },
			    pointLabels: {
			      	fontSize: 18
			    }
			},
			legend: {
			    position: 'left'
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
				        data: [poderMecanico, fio2, tidal, driving, pico, presionMeseta],
				        backgroundColor: [
			            	'rgba(0, 0, 0, .1)'
			            ],
			            borderColor: [
			            	'rgba(0, 0, 0, 1)'
			            ],
			            borderWidth: 1,
			            radius: 6,
			            pointRadius: 6,
					    pointBorderWidth: 3,
					    pointBackgroundColor: "rgba(0,0,0, .5)",
					    pointBorderColor: "rgba(0,0,0,0.6)",
					    pointHoverRadius: 10
					}
				    myChart.data.datasets[2] = radarPaciente;
				    var radarPeep = {
				    	label: "PEEP Paciente",
				        data: [peep, peep, peep, peep, peep, peep],
				        backgroundColor: [
			            	'rgba(0, 200, 185, .2)'
			            ],
			            borderColor: [
			            	'rgba(0, 200, 185, 1)'
			            ],
			            borderWidth: 1,
			            radius: 1,
			            pointRadius: 2,
					    pointBorderWidth: 2,
					    pointBackgroundColor: "rgba(0,200,185,.5)",
					    pointBorderColor: "rgba(0,220,200,0.6)",
					    pointHoverRadius: 4
					}
					myChart.data.datasets[3] = radarPeep;


				    myChart.update();
					
				    var table = '<table class="table table-sm table-bordered my-3 text-center">'+
						'<tbody>'+
							'<tr>'+
								'<th>Poder Mecánico</th>'+
								'<td>'+poderMecanico+' Joules </td>'+
								'<th>FIO<sub>2</sub></th>'+
								'<td>'+ fio2 +' % </td>'+
								'<th>Volumen Tidal</th>'+
								'<td>'+tidal+' ml/Kg </td>'+
							'</tr>'+
							'<tr>'+
								'<th>Driving Pressure</th>'+
								'<td>'+driving+' cmH<sub>2</sub>O </td>'+
								'<th>Presión Pico</th>'+
								'<td>'+pico+' cmH<sub>2</sub>O </td>'+
								'<th>Presión Meseta</th>'+
								'<td>'+presionMeseta+' cmH<sub>2</sub>O </td>'+
							'</tr>'+
							'<tr>'+
								'<th>PEEP</th>'+
								'<td>'+peep+' cmH<sub>2</sub>O </td>'+
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
	
	//tab de historial
	$('#v-pills-profile-tab').click(ev=>{

		$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: {'fn': 'groupByExpediente'}
		}).done(function(resp){
			console.log(resp);
			//limpiamos el tbody
			$('#tableExp tbody').empty();

			if ( $.fn.dataTable.isDataTable( '#tableExp' ) ) {
				$('#tableExp').DataTable().destroy();
			}
			
			var divExp = "";

			resp.forEach((pac, index)=>{
				divExp += '<tr>'+
					'<td>'+
						'<div class="accordion">'+
						  	'<div class="card">'+
						    	'<div class="card-header">'+
						      		'<h5 class="mb-0">'+
						        		'<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse'+index+'" aria-expanded="false" aria-controls="collapse'+index+'">'+
						          			'No. '+pac.expediente+
						        		'</button>'+
						        		'<button class="btn btn-danger btn-sm delete-paciente" type="button" data-exp="'+pac.expediente+'"> <i class="fas fa-times"></i> </button>'+
						     		 '</h5>'+
						    	'</div>'+
						    	'<div id="collapse'+index+'" class="collapse" data-exp="'+pac.expediente+'" aria-labelledby="headingFour">'+
						      		'<div class="card-body">'+
						      			'<table>'+
											'<thead>'+
					      						'<tr>'+
					      							'<th>Peso</th>'+
					      							'<th>Estatura</th>'+
					      							'<th>Genero</th>'+
					      							'<th>F. Respiratoria</th>'+
					      							'<th>V. Tidal</th>'+
					      							'<th>P. Pico</th>'+
					      							'<th>P. Meseta</th>'+
					      							'<th>PEEP</th>'+
					      							'<th>FiO2</th>'+
					      							'<th>Poder Mecánico</th>'+
					      							'<th>V. Tidal ml/Kg</th>'+
					      							'<th>Fecha</th>'+
					      							'<th>Borrar</th>'+
					      						'</tr>'+
					      					'</thead>'+
											'<tbody> </tbody>'+
										'</table>'+
						      		'</div>'+
						    	'</div>'+
						  	'</div>'+
						'</div>'+
					'</td>'+
				'</tr>';


			});

			
			$('#tableExp tbody').html(divExp);

			var tablaExp = $('#tableExp').DataTable({
				"language": {
                	"url": "../assets/DataTables/Spanish.json"
            	},
        		responsive: true
    		});

    		addShowCollapse();

//añadido borrar el collapse		
$('body').on('click', '.delete-paciente', function(ev){
	var active = $(this);
	var expediente = active.data('exp');

	swal({
	  title: '¡Eliminar!',
	  text: "¿Deseas borrar el expediente " + expediente +"?",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, borralo',
	  cancelButtonText: 'No, detente'
	}).then((result) => {
	  if (result.value) {

	  	$.ajax({
			url: '../modelo/Peticiones',
			type: 'POST',
			dataType: 'json',
			data: {'fn': 'deleteExpediente', 'expediente': expediente}
		}).done(function(resp){
			console.log(resp);
			swal(
		      'Eliminado',
		      'El expediente a sido eliminado',
		      'success'
		    )
		    tablaExp.row( active.parents('tr') ).remove().draw();
		}).fail(function(){
			console.log("Fallo la ejecucion del ajax");
			swal(
		      '¡Uppss!',
		      'Tuvimos un error al eliminar el expediente, verificalo e intenta nuevamente, gracias',
		      'info'
		    )
		    tablaExp.draw();
		});
	    
	  }
	})

	

})

		}).fail(function() {
			console.log("error");
			swal('Upps!', 'Lo sentimos ocurrio un error, intenta nuevamente, gracias', 'error');	
		});


	});

});

var addShowCollapse = function(){
	$('.collapse').on('show.bs.collapse', event=>{
		//console.log(event);
		//console.log("Se mostro el collapse");
		var idCollapse = event.currentTarget.id;
		var noExp = event.currentTarget.dataset.exp;
		//console.log(noExp);

		$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: {'fn': 'rowPaciente', 'expediente': noExp}
		}).done(function(resp){
			console.log(resp);
			
			$('#'+idCollapse + ' table tbody').empty();

			if ( $.fn.dataTable.isDataTable( '#'+idCollapse + ' table' ) ) {
				$('#'+idCollapse + ' table').DataTable().destroy();
			}

			var body = "";
			resp.data.forEach(pac=>{
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
					+'<td> <button class="btn btn-danger btn-sm delete-row" type="button" data-row="'+pac.id_paciente+'"> <i class="fas fa-times"></i> </button> </td>'
				+'</tr>';
			});

			$('#'+idCollapse + ' table tbody').html(body);

			var tablaRows = $('#'+idCollapse + ' table').DataTable({
				"language": {
	            	"url": "../assets/DataTables/Spanish.json"
	        	},
	    		"order": [[ 11, "desc" ]],
	    		responsive: true
			});
			
//añado el evento de borrar
$('body').on('click', '.delete-row', function(ev){


	var active = $(this);
	var row = active.data('row');

	swal({
	  title: '¡Eliminar!',
	  text: "¿Deseas borrar el expediente registro?",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, borralo',
	  cancelButtonText: 'No, detente'
	}).then((result) => {
	  if (result.value) {

	  	$.ajax({
			url: '../modelo/Peticiones',
			type: 'POST',
			dataType: 'json',
			data: {'fn': 'deleteRow', 'row': row}
		}).done(function(resp){
			console.log(resp);
			swal(
		      'Eliminado',
		      'El expediente a sido eliminado',
		      'success'
		    )

			tablaRows.row( active.parents('tr') ).remove().draw();

		}).fail(function(){
			console.log("Fallo la ejecucion del ajax");
			swal(
		      '¡Uppss!',
		      'Tuvimos un error al eliminar el expediente, verificalo e intenta nuevamente, gracias',
		      'info'
		    )

		    tablaRows.draw();
		});
	    
	  }
	})

})




		}).fail(function(){
			console.log("Fallo la ejecucion del ajax");
		});

		

	});

}

$('body').on('click', '.delete-paciente', function(ev){
	var active = $(this);
	var expediente = active.data('exp');

	swal({
	  title: '¡Eliminar!',
	  text: "¿Deseas borrar el expediente " + expediente +"?",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, borralo',
	  cancelButtonText: 'No, detente'
	}).then((result) => {
	  if (result.value) {

	  	$.ajax({
			url: '../modelo/Peticiones',
			type: 'POST',
			dataType: 'json',
			data: {'fn': 'deleteExpediente', 'expediente': expediente}
		}).done(function(resp){
			console.log(resp);
			swal(
		      'Eliminado',
		      'El expediente a sido eliminado',
		      'success'
		    )
		}).fail(function(){
			console.log("Fallo la ejecucion del ajax");
			swal(
		      '¡Uppss!',
		      'Tuvimos un error al eliminar el expediente, verificalo e intenta nuevamente, gracias',
		      'info'
		    )
		});
	    
	  }
	})

	

})

/*
$('body').on('click', '.delete-row', function(ev){
	var active = $(this);
	var row = active.data('row');

	swal({
	  title: '¡Eliminar!',
	  text: "¿Deseas borrar el expediente registro?",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, borralo',
	  cancelButtonText: 'No, detente'
	}).then((result) => {
	  if (result.value) {

	  	$.ajax({
			url: '../modelo/Peticiones',
			type: 'POST',
			dataType: 'json',
			data: {'fn': 'deleteRow', 'row': row}
		}).done(function(resp){
			console.log(resp);
			swal(
		      'Eliminado',
		      'El expediente a sido eliminado',
		      'success'
		    )


		}).fail(function(){
			console.log("Fallo la ejecucion del ajax");
			swal(
		      '¡Uppss!',
		      'Tuvimos un error al eliminar el expediente, verificalo e intenta nuevamente, gracias',
		      'info'
		    )
		});
	    
	  }
	})

})
*/