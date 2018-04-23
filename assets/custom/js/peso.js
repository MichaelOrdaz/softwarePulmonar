$(function(){

	$('#pesoPredicho').submit(function(ev){
		ev.preventDefault();
		var datos = $(this).serializeArray();
		document.querySelector("#pesoPredicho").reset();

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
		
	});
});