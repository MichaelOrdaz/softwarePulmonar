$(function(){
	$('[data-toggle="tooltip"]').tooltip();
//ajax que rescata los datos y calcula el IMC
	$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: {fn: 'getPaciente'}
	}).done(function(json){
		//console.log("success");
		var paciente = json[0];
		var imc = calcularIMC(paciente.peso, paciente.estatura);
		
		//console.log(imc);
		var aviso, colorIMC, contorno;
		if( imc < 18 ){
			aviso = "Peso Bajo";
			colorIMC = 'rgba(245, 87, 87, .2)';
			contorno = 'red';	
		}
		else if( imc >= 18 && imc <=24.9 ){
			aviso = "Normal";
			colorIMC = 'rgba(86, 87, 246, .2)';
			contorno = 'blue';	
		}
		else if( imc >= 25 && imc <=26.9 ){
			aviso = "Sobrepeso";
			colorIMC = 'rgba(241, 247, 38, .2)';
			contorno = 'yellow';	
		}
		else if( imc >= 27 ){
			aviso = "Obesidad";
			colorIMC = 'rgba(245, 87, 87, .2)';	
			contorno = 'red';	
		}

		var info = '<div class="p-2 rounded bg-gradient-secondary text-white">'+
			'<h3>Datos del Paciente</h3>'+
			'<p><b>Estatura: </b>'+ paciente.estatura + 'cm</p>'+ 
			'<p><b>Peso: </b>'+ paciente.peso + 'Kg</p>'+
			'<p><b>Sexo: </b>'+ (paciente.genero == 'h' ? 'Masculino':'Femenino') + '</p>'+
			'<p><b>IMC: </b><span id="imc">'+ imc + '</span></p>'+
			'<p><b>Clasificación de IMC: </b>'+ aviso + '</p>'+
		'</div>';
		$('#prevData').html(info);


		var ctx = document.querySelector("#myGraf");
		var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Poder Mecanico", "IMC"],
	        datasets: [{
	            label: '',
	            data: [0, imc],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                //'rgba(54, 162, 235, 0.2)'
	            	colorIMC
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                //'rgba(54, 162, 235, 1)'
	            	contorno
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});


	}).fail(function() {
		//console.log("error");
	});




	$('#formPoderMecanico').submit(function(ev){
		ev.preventDefault();

		var valores = $(this).serializeArray();
		//console.log(valores);
		var power = getPoderMecanico( valores[0].value, valores[1].value, valores[2].value, valores[3].value, valores[4].value, valores[5].value );

		valores.push({name: 'fn', value: 'paso2'}); 
		valores.push({name: 'poderMecanico', value: power});
		//console.log(valores);

		
		$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: valores,
		beforeSend: ()=>{
			$("#formPoderMecanico :submit").prop('disabled', true);
		}
		}).done(function(json){
			//console.log("success");
			$("#formPoderMecanico :submit").prop('disabled', false);
				console.log("Todo correcto");
			/*if(json.filas > 0){
			}	
			else{
			}*/
				//swal("Upss!!", "Lo sentimos tuvimos un error, por favor intenta nuevamente", 'error');

		}).fail(function() {
			console.log("error");
		
		});

		if(power > 13){
			swal("Zona de Riesgo!!", "Nivel mecánico de "+ power, "error");
			alertify.error("Poder Mecánico Riesgoso!!");

		}
		else if(power <= 13){
			swal("Poder Mecánico Estable!!", "Nivel mecánico de "+ power, "success");
			alertify.success("Poder Mecánico Estable!!");

		}

		document.querySelector("#formPoderMecanico").reset();

		var html = "<b>Frecuencia Respiratoria:</b> " + valores[1].value + "<br>"
		+ "<b>Volumen Tidal</b> " + valores[2].value + " <br>"
		+ "<b>Presión Pico</b> " + valores[3].value + " <br>"
		+ "<b>Meseta</b> " + valores[4].value + " <br>"
		+ "<b>PEEP</b> " + valores[5].value + " <br>";
		
		$("#datosIngresados").html(html);


	});

});

var calcularIMC = function(peso, altura){
	var pesoKg = parseFloat(peso);
	var alturaMts = parseFloat(altura/100);
	var imc = ( pesoKg / Math.pow(alturaMts, 2) );
	return imc.toFixed(2);
}

//calcular el poder mecanico
var getPoderMecanico = function(cmAgua, fr, vt, pico, meseta, peep){
		//0.098 * 25 * 500 * [ 34 - ( (30-5)/2 ) ]
		var parte1 = (meseta - peep) / 2;
		parte1 = pico - parte1;
		var parte2 = (fr * vt) / 1000;
		var result = cmAgua * parte2 * parte1;
		result = result.toFixed(2);

		result = result <= 0 ? 0:result;
		var colorPM, contornoPM;
		if( result <= 13 ){
			colorPM = 'rgba(2, 223, 12, .2)';
			contornoPM = 'green';
		}
		else{
			colorPM = 'rgba(245, 87, 87, .2)';
			contornoPM = 'red';	
		}


		var imc = $('#imc').text();
		imc = parseFloat(imc);
		console.log(imc);
		var aviso, colorIMC, contorno;
		if( imc < 18 ){
			aviso = "Peso Bajo";
			colorIMC = 'rgba(245, 87, 87, .2)';
			contorno = 'red';	
		}
		else if( imc >= 18 && imc <=24.9 ){
			aviso = "Normal";
			colorIMC = 'rgba(86, 87, 246, .2)';
			contorno = 'blue';	
		}
		else if( imc >= 25 && imc <=26.9 ){
			aviso = "Sobrepeso";
			colorIMC = 'rgba(241, 247, 38, .2)';
			contorno = 'yellow';	
		}
		else if( imc >= 27 ){
			aviso = "Obesidad";
			colorIMC = 'rgba(245, 87, 87, .2)';	
			contorno = 'red';	
		}


		var ctx = document.querySelector("#myGraf");
		var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Poder Mecanico", "IMC"],
	        datasets: [{
	            label: '',
	            data: [result, imc],
	            backgroundColor: [
	                //'rgba(255, 99, 132, 0.2)',
	                //'rgba(54, 162, 235, 0.2)'
	            	colorPM,
	            	colorIMC
	            ],
	            borderColor: [
	                //'rgba(255,99,132,1)',
	                //'rgba(54, 162, 235, 1)'
	            	contornoPM,
	            	contorno
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});

	return parseInt( result );
}