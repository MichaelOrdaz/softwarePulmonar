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
	<link rel="stylesheet" href="../assets/custom/css/peso.css">
</head>
<body>
	<a href="ventilacion#historial" title="Historial" class="btn btn-light" style="transform: scale(.8); position: fixed; bottom: 50px; right: 20px; z-index: 100; box-shadow: 0 0 5px black"> historial </a>
<header class="d-flex justify-content-center">
	<p>Datos de Paciente</p>
</header>
<!-- /header -->
<section class="container">
	<article class="row">
		<div class="col-8">
			<form action="#" method="GET" accept-charset="utf-8" role="formulario" id="pesoPredicho">
				
				<div class="form-group">
					<label for="exp">No. Expediente:</label>
					<div class="input-group">
						<input type="text" name="exp" class="form-control" id="exp" minlength="12" maxlength="12" autofocus placeholder="# de Expediente" />
						<div class="input-group-append">
					    	<span class="input-group-text">#</span>
					  	</div>
					</div>
				</div>

				<div class="form-group">
					<label for="peso">Peso en Kg.:</label>
					<div class="input-group">
						<input type="number" name="peso" class="form-control" id="peso" placeholder="Peso del paciente en Kilogramos" min="0" step="0.01" required />
						<div class="input-group-append">
					    	<span class="input-group-text">Kg</span>
					  	</div>
					</div>
				</div>

				<div class="form-group">
					<label for="talla">Estatura en cm:</label>
					<div class="input-group">
						<input type="number" name="talla" class="form-control" id="talla" placeholder="Talla del paciente en cm" min="0" required />
						<div class="input-group-append">
					    	<span class="input-group-text">cm</span>
					  	</div>
					</div>
				</div>

				<div class="form-group">
				</div>
				<p>Genero</p>
				<div class="custom-control custom-radio custom-control-inline">
				  	<input type="radio" id="radio1" name="genero" class="custom-control-input" value="h" required >
				  	<label class="custom-control-label" for="radio1">Hombre</label>
				</div>
				<div class="custom-control custom-radio custom-control-inline mb-5">
				  	<input type="radio" id="radio2" name="genero" class="custom-control-input" value="m" >
				  	<label class="custom-control-label" for="radio2">Mujer</label>
				</div>

				<button type="submit" class="btn btn-dark btn-block">Siguiente</button>
			</form>
		</div>
		<div class="col">
			<img src="../assets/img/paciente.png" alt="paciente" class="img-fluid">
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
<script src="../assets/custom/js/peso.js"></script>

</body>
</html>