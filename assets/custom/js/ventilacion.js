var myChart;

$(function(){
	
	var ctx = document.querySelector("#radarPaciente");
	var myChart = new Chart(ctx, {
    	type: 'radar',
    	data: {
		    labels: ['Poder Mecánico', 'FiO2', 'Volumen Tidal', 'Driving Pressure', 'Presión Pico', 'Presión Meseta', 'PEEP'],
		    datasets: [{
		    	label: "#",
		        data: [13, 60/2, 9, 15, 35, 30, 5*2],
		        backgroundColor: [
	            	'rgba(64, 192, 8, .2)'
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
	

});