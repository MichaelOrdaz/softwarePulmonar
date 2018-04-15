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
	<link rel="stylesheet" href="../assets/custom/css/ventilacion.css">
	
</head>
<body>
<header class="d-flex justify-content-center">
	Vista General del Paciente
</header>
<!-- /header -->
<section class="container-fluid">
	<article class="row">
		<div class="col-6 offset-3 col-sm-2 offset-sm-0">
		    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
		      <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Reporte</a>
		      <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Historial</a>
		    </div>
		  </div>
		  <div class="col col-sm-10">
		    <div class="tab-content" id="v-pills-tabContent">
		      <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
		      	
		      	<div class="col">
					<p class="lead">
						Para terminar con el reporte del paciente por favor ingrese el <b>FIO2</b>
					</p>
					<form action="#" method="GET" accept-charset="utf-8" role="formulario" id="form-fio2">
						<div class="form-group">
							<label for="fio2">FIO2</label>
							<input type="number" name="fio2" class="form-control" id="fio2" placeholder="Ingresa el FIo2" min="21" max="60" step="0.01" required />
						</div>
						<button type="submit" class="btn btn-primary btn-block">Reporte</button>
					</form>
					<canvas class="border" width="" height="" id="radarPaciente"></canvas>
				</div>
		      
		      </div>
		      <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
		      	
		      	<div class="col">
		      		<h2>Historial</h2>
		      		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		      		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		      		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
		      		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		      	</div>


		      </div>
		    </div>
		  </div>
	</article>
</section>

<footer class="d-flex justify-content-center">
	&copy; 2018 Dr. Larios Todos los derechos Reservados 
</footer>

<script src="../assets/jquery/jquery-3.3.1.min.js"></script>
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>
<script src="../assets/swal/swalalert.js"></script>
<script src="../assets/alertify/alertify.min.js"></script>
<script src="../assets/Chartjs/Chart.bundle.min.js"></script>
<script src="../assets/custom/js/ventilacion.js"></script>

</body>
</html>