<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Ventilación Segura</title>
	<meta name="descripcion" content="Sistema para capturar datos de pacientes conectados y verificar sus signos vitales">
	<link rel="shortcut icon" href="../assets/img/favicon3.png">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="../assets/alertify/css/alertify.min.css">
	<link rel="stylesheet" type="text/css" href="../assets/alertify/css/themes/bootstrap.min.css">
	<link rel="stylesheet" href="../assets/custom/css/poderMecanico.css">
	
</head>
<body>
<header class="container-fluid">
	<div class="row">
		<div class="col-1">
			<a href="datosPeso" title="Nuevo Reporte" data-toggle="tooltip" class="btn btn-light btn-sm">+</a>
		</div>
		<div class="col">
			<h5>Vista General del Paciente</h5>
		</div>
	</div>
</header>
<div class="container">
	<div class="mb-5 row justify-content-center">
		<div class="col-auto">
			<h1>Ventilación Segura</h1>
		</div>
	</div>
	<div class="row">
		<div class="col-8 offset-2 col-sm-3 offset-sm-0" id="prevData">
			
		</div>
		<div class="col-10 offset-1 col-sm offset-sm-0">
			<form action="#" method="GET" accept-charset="utf-8" role="formulario" id="formPoderMecanico">
				
				<div class="form-group">
					<label for="consagua">Constante:</label>
					<div class="input-group">
						<input type="text" name="const" class="form-control" value="0.098" id="consagua" readonly>
						<div class="input-group-append">
					    	<span class="input-group-text">ml</span>
					  	</div>
					</div>
				</div>
				<div class="form-group">
					<label for="fr">Frecuencia Respiratoria</label>
					<div class="input-group">
						<input type="text" name="fr" id="fr" class="form-control" required />
						<div class="input-group-append">
					    	<span class="input-group-text">Rate</span>
					  	</div>	
					</div>	
				</div>
				<div class="form-group">
					<label for="vt">Volumen Tidal</label>
					<div class="input-group">
						<input type="text" name="vt" id="vt" class="form-control" required />
						<div class="input-group-append">
					    	<span class="input-group-text">ml</span>
					  	</div>
					</div>
					<div class="alert alert-warning my-1" style="display: none;"></div>
				</div>
				<div class="form-group">
					<label for="pico">Presión Pico</label>
					<div class="input-group">	
						<input type="text" name="pico" id="pico" class="form-control" required />
						<div class="input-group-append">
					    	<span class="input-group-text">cmH<sub>2</sub>O</span>
					  	</div>
					</div>
					<div class="alert alert-warning my-1" style="display: none;"></div>
				</div>
				<div class="form-group">
					<label for="meseta">Presión Meseta</label>
					<div class="input-group">
						<input type="text" name="meseta" id="meseta" class="form-control" required />
						<div class="input-group-append">
					    	<span class="input-group-text">cmH<sub>2</sub>O</span>
					  	</div>
					</div>
					<div class="alert alert-warning my-1" style="display: none;"></div>
				</div>
				<div class="form-group">
					<label for="peep"> PEEP </label>
					<div class="input-group">
						<input type="text" name="peep" id="peep" class="form-control" required />
						<div class="input-group-append">
					    	<span class="input-group-text">cmH<sub>2</sub>O</span>
					  	</div>
					</div>
					<div class="alert alert-warning my-1" style="display: none;"></div>
				</div>
				<input type="hidden" name="vt2" id="vt2" />
				<button type="submit" class="btn btn-dark btn-block">Graficar</button>

			</form>
		</div>
		<div class="col-8 offset-2 col-sm-4 offset-sm-0">
			<h4>Parámetros ingresados</h4>
			<div id="datosIngresados" class="mb-3">
				<span class="bg-info rounded">Esperando datos..</span>
			</div>
			<canvas width="" height="350" id="myGraf" class="border rounded" > </canvas>
		</div>
	</div>
</div>
<div class="clearfix"></div>
<a class="btn btn-dark btn-lg" href="javascript://" onclick="redirect()" id="btnNext" data-toggle="tooltip" title="Siguiente Paso"> <i class="fas fa-arrow-circle-right"></i></a>
<footer class="d-flex justify-content-center">
	&copy; 2018 Dr. Carlos Larios Todos los derechos Reservados
</footer>

<script src="../assets/jquery/jquery-3.3.1.min.js"></script>
<script src="../assets/popover/popover.js"></script>
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../assets/swal/swalalert.js"></script>
<script type="text/javascript" src="../assets/fontawesome/js/fontawesome-all.min.js"></script>
<script src="../assets/alertify/alertify.min.js"></script>
<script src="../assets/Chartjs/Chart.bundle.min.js"></script>
<script src="../assets/custom/js/main.js"></script>
</body>
</html>