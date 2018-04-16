var ctx = document.querySelector("#myGraf");
var myChart;
$(function(){
	$('[data-toggle="tooltip"]').tooltip();

//evento del peep
	$('#peep').change((ev)=>{
		var valor = $('#peep').val();
		//console.log( valor );
		if( valor < 5 ){
			alertify.error('No se recomienda PEEP menor de 5cmH2O');
			$("#formPoderMecanico :submit").prop('disabled', true);
			$('#peep').parent().children('div.alert').text('No se recomienda PEEP menor de 5cmH2O, por favor aumenta el PEEP');
			$('#peep').parent().children('div.alert').slideDown();
		}
		else{
			$("#formPoderMecanico :submit").prop('disabled', false);
			$('#peep').parent().children('div.alert').empty();
			$('#peep').parent().children('div.alert').slideUp();
		}
	});

	//evento del volumen tidal
	$('#vt').change((ev)=>{
		var vt = $('#vt').val();
		var predicho = document.querySelector('#prevData #pesoPredicho').textContent;
		predicho = parseFloat(predicho);
		vt = parseFloat(vt);

		var result = (vt/predicho);
		result = result.toFixed(2);
		console.log(result);
		
		if( result > 9 ){
			alertify.error('Volumen riesgoso ' + result + "ml/Kg");
			$("#formPoderMecanico :submit").prop('disabled', true);
			$('#mlkg').text(result+"ml/Kg");
			$('#mlkg').addClass('bg-warning');
			$('#mlkg').removeClass('bg-info');
			$('#vt').parent().children('div.alert').text('Volumen riesgoso ' + result + "ml/Kg. Por favor disminuya el volumen tidal");
			$('#vt').parent().children('div.alert').slideDown();
		}
		else{
			$("#formPoderMecanico :submit").prop('disabled', false);
			$('#mlkg').text(result + "ml/Kg");
			$('#mlkg').removeClass('bg-warning');
			$('#mlkg').addClass('bg-info');
			$('#vt').parent().children('div.alert').empty();
			$('#vt').parent().children('div.alert').slideUp();
		}
		$('#mlkg').fadeOut();
		$('#mlkg').fadeIn();

		$('#vt2').val(result);
	});

	$('#meseta').change((ev)=>{
		var valor = $('#meseta').val();
		if( valor > 30 ){
			alertify.error('Presión Meseta excesiva por riesgo de lesión pulmonar inducida por ventilador, por favor reducirla');
			$("#formPoderMecanico :submit").prop('disabled', true);
			$('#meseta').parent().children('div.alert').text('Presión Meseta excesiva por riesgo de lesión pulmonar inducida por ventilador, por favor reducirla');
			$('#meseta').parent().children('div.alert').slideDown();
		}
		else{
			$("#formPoderMecanico :submit").prop('disabled', false);
			$('#meseta').parent().children('div.alert').empty();
			$('#meseta').parent().children('div.alert').slideUp();
		}
	});

	$('#pico').change((ev)=>{
		var valor = $('#pico').val();
		if( valor > 35 ){
			alertify.error('Verificar problemas de resistencia o flujo inspiratorio excesivo');
			$("#formPoderMecanico :submit").prop('disabled', true);
			$('#pico').parent().children('div.alert').text('Verificar problemas de resistencia o flujo inspiratorio excesivo');
			$('#pico').parent().children('div.alert').slideDown();
		}
		else{
			$("#formPoderMecanico :submit").prop('disabled', false);
			$('#pico').parent().children('div.alert').empty();
			$('#pico').parent().children('div.alert').slideUp();
		}
	});
//ajax que rescata los datos y calcula el IMC
	$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: {fn: 'getPaciente'}
	}).done(function(json){
		//console.log("success");
		//console.log( typeof json[0] );
		
		if( typeof json[0] === 'undefined'  ){
			window.location.href = "../index";
		}

		var paciente = json[0];
		var imc = calcularIMC(paciente.peso, paciente.estatura);
		var pesoPredicho = calcularPesoPredicho(paciente.estatura, paciente.genero);
		
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
			'<p><b>Peso Predicho: </b><span id="pesoPredicho">'+ pesoPredicho + '</span></p>'+
			"<p class='p-1 rounded font-weight-bold text-center' id='mlkg' style='display: none;'> </p>";
		'</div>';
		$('#prevData').html(info);

		myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["IMC"],
	        datasets: [{
	            label: '#',
	            data: [imc],
	            backgroundColor: [
	            	colorIMC
	            ],
	            borderColor: [
	            	contorno
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	title: {
            	display: true,
            	text: 'Ventilación Mecánica'
        	},
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
		var power = getPoderMecanico( valores[0].value, valores[1].value, valores[2].value, valores[3].value, valores[4].value, valores[5].value );

		valores.push({name: 'fn', value: 'paso2'});
		valores.push({name: 'poderMecanico', value: power});

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
		+ "<b>PEEP</b> " + valores[5].value + " <br>"
		+ "<p class='bg-secondary rounded p-1 text-white'><b>PODER MECÁNICO</b> " + power + " </p><br>";
		
		$("#datosIngresados").html(html);


	});//ENd Submit

});//End DocumentReady

var calcularIMC = function(peso, altura){
	var pesoKg = parseFloat(peso);
	var alturaMts = parseFloat(altura/100);
	var imc = ( pesoKg / Math.pow(alturaMts, 2) );
	return imc.toFixed(2);
}
var calcularPesoPredicho = function(talla, sexo){
	var tallacm = parseFloat(talla);
	//(Talla en cm – 152.4) x 0.91 sumando al resultado por ser mujer 45.5 y si es hombre 50
	if( sexo == 'm' ){
		var result = ( ( tallacm - 152.4) * 0.91 ) + 45.5;
	}
	else if(sexo == 'h'){
		var result = ( ( tallacm - 152.4) * 0.91 ) + 50;
	}
	return result.toFixed(2);
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
		//actualizo CHartJS
		myChart.data.labels[1] = 'Poder Mecanico';
	    myChart.data.datasets[0].data[1] = result;
	    myChart.data.datasets[0].backgroundColor[1] = colorPM;
	    myChart.data.datasets[0].borderColor[1] = contornoPM;
	    myChart.update();
	
	return result;
}

var redirect = function(){
	$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: {fn: 'getPaciente'}
	}).done(function(json){

		if(json[0].poderMecanico != 0){
			window.location.href = "ventilacion";
		}
		else{
			alertify.message('Llene el formulario por favor');
		}

	});

}