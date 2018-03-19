$(function(){

	//alert("cargo la pagina");
	$('#formPoderMecanico').submit(function(ev){
		ev.preventDefault();

		var valores = $(this).serializeArray();
		console.log(valores);
		var power = getPoderMecanico( valores[0].value, valores[1].value, valores[2].value, valores[3].value, valores[4].value, valores[5].value );

		if(power >= 12){
			swal("Poder Mecanico Peligroso!!", "nivel mecanico de "+ power, "error");
			alertify.error("Poder Mecanico Peligroso!!");

		}
		else if(power < 12){
			swal("Poder Mecanico Estable!!", "nivel mecanico de "+ power, "success");
			alertify.success("Poder Mecanico Estable!!");

		}

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
	        labels: ["Poder Mecanico", "Blue", "Yellow", "Green"],
	        datasets: [{
	            label: 'Ventilación Humana',
	            data: [result, 19, 3, 5],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)'
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