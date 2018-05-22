clearInterval(timer);

document.querySelector('#peso').focus();

$('#pesoPredicho').submit(function(ev){
	ev.preventDefault();
	var data = $(this).serializeArray();
	document.querySelector("#pesoPredicho").reset();

	var datos = {
		peso: data[0].value,
		estatura: data[1].value,
		genero: data[2].value
	}

	window.localStorage.setItem('datos', JSON.stringify( datos ));


	swal({
	  title: 'Espere por favor',
	  onOpen: () => {
	    swal.showLoading()
	  },
	  allowOutsideClick: false
	})

	setTimeout(()=>{
		swal.close();
		cargar('vista/poderMecanico');
	}, 1500);



		
	/*
	datos.push({name: 'fn', value: 'paso1'}); 
	console.log( datos );
	$.ajax({
		url: '../modelo/Peticiones',
		type: 'POST',
		dataType: 'json',
		data: datos,
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
		swal.close();
		setTimeout(()=>{
			window.location.href = "poderMecanico";
		}, 1000);
	
	}).fail(function() {
		swal.close();
		console.log("error");
	});
	*/
	
});
