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
<header>
	Datos de Paciente
</header>
<div class="container">
	<div class="row justify-content-center">
		<div class="col-auto">
			<h1>Ventilación Segura HTO</h1>
		</div>
	</div>
	<div class="row">
		<div class="col-3">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</div>
		<div class="col">
			<form action="#" method="GET" accept-charset="utf-8" role="formulario" id="formPoderMecanico">
				<div class="form-group">
					<label for="consagua">Constante:</label>
					<input type="text" name="const" class="form-control" value="0.098" id="consagua" readonly>
				</div>
				<div class="form-group">
					<label for="fr">Frecuencia Respiratoria</label>
					<input type="text" name="fr" id="fr" class="form-control" required />
					<small class="form-text text-muted">ejemplo 17 ó 25</small>
				</div>
				<div class="form-group">
					<label for="vt">Volumen Tidal</label>
					<input type="text" name="vt" id="vt" class="form-control" required />
					<small class="form-text text-muted">ejemplo 500</small>
				</div>
				<div class="form-group">
					<label for="pico">Presión Pico</label>
					<input type="text" name="pico" id="pico" class="form-control" required />
					<small class="form-text text-muted">ejemplo 26 ó 34</small>
				</div>
				<div class="form-group">
					<label for="meseta">Presion Meseta</label>
					<input type="text" name="meseta" id="meseta" class="form-control" required />
					<small class="form-text text-muted">ejemplo 30</small>
				</div>
				<div class="form-group">
					<label for="peep"> PEEP </label>
					<input type="text" name="peep" id="peep" class="form-control" required />
					<small class="form-text text-muted">ejemplo 5</small>
				</div>

				<button type="submit" class="btn btn-primary btn-block">Graficar</button>

			</form>
		</div>
		<div class="col-4">
			<h4>Signos ingresados</h4>
			<div id="datosIngresados">
				
			</div>
			<canvas width="" height="" id="myGraf" > </canvas>
		</div>
	</div>
</div>
<footer>
	&copy; 2018 Dr. Carlos Larios Todos lo derehos Reservados 
</footer>


<script src="../assets/jquery/jquery-3.3.1.min.js"></script>
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../assets/swal/swalalert.js"></script>
<script src="../assets/alertify/alertify.min.js"></script>
<script src="../assets/Chartjs/Chart.bundle.min.js"></script>
<script src="../assets/custom/js/main.js"></script>


</body>
</html>