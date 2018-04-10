$(function(){

	var ctx = document.querySelector("#myGraf");
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Poder Mecanico", "IMC"],
	        datasets: [{
	            label: 'Ventilación Mecanica',
	            data: [0, 0],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)'
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

	//alert("cargo la pagina");
	$('#formPoderMecanico').submit(function(ev){
		ev.preventDefault();

		var valores = $(this).serializeArray();
		//console.log(valores);
		var power = getPoderMecanico( valores[0].value, valores[1].value, valores[2].value, valores[3].value, valores[4].value, valores[5].value );

		if(power > 13){
			swal("Zona de Riesgo!!", "nivel mecanico de "+ power, "error");
			alertify.error("Poder Mecanico Peligroso!!");

		}
		else if(power <= 13){
			swal("Poder Mecanico Estable!!", "nivel mecanico de "+ power, "success");
			alertify.success("Poder Mecanico Estable!!");

		}

		document.querySelector("#formPoderMecanico").reset();

		var html = "<b>Frecuencia Respiratoria:</b> " + valores[1].value + "<br>"
		+ "<b>Volumen Tidal</b> " + valores[2].value + " <br>"
		+ "<b>Presión Pico</b> " + valores[3].value + " <br>"
		+ "<b>Meseta</b> " + valores[4].value + " <br>"
		+ "<b>PEEP</b> " + valores[5].value + " <br>";
		
		$("#datosIngresados").html(html);

	});

	var getPoderMecanico = function(cmAgua, fr, vt, pico, meseta, peep){
		//0.098 * 25 * 500 * [ 34 - ( (30-5)/2 ) ]
		var parte1 = (meseta - peep) / 2;
		parte1 = pico - parte1;
		var parte2 = (fr * vt) / 1000;
		var result = cmAgua * parte2 * parte1;

	var ctx = document.querySelector("#myGraf");
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Poder Mecanico", "IMC"],
	        datasets: [{
	            label: 'Ventilación Mecanica',
	            data: [result, 19, 3, 5],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)'
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

})