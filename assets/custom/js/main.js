$(function(){

	//alert("cargo la pagina");
	$('#formPoderMecanico').submit(function(ev){
		ev.preventDefault();

		var valores = $(this).serializeArray();
		console.log(valores);
		var power = getPoderMecanico( valores[0].value, valores[1].value, valores[2].value, valores[3].value, valores[4].value, valores[5].value );

		if(power >= 12){
			swal("Poder Mecanico Peligroso!!", "nivel mecanico de "+ power, "error");
		}
		else if(power < 12){
			swal("Poder Mecanico Estable!!", "nivel mecanico de "+ power, "success");
		}

	});

	var getPoderMecanico = function(cmAgua, fr, vt, pico, meseta, peep){
		//0.098 * 25 * 500 * [ 34 - ( (30-5)/2 ) ]
		var parte1 = (meseta - peep) / 2;
		parte1 = pico - parte1;
		var parte2 = (fr * vt) / 1000;
		var result = cmAgua * parte2 * parte1;
		return parseInt( result );
	}

})