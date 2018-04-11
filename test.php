<?php 
  	$h = "localhost";
	  $u = "michaelo_1";
	  $p = "%some_pass2018";
	$dbName = "michaelo_ventilacion";
	/*
	$h = "localhost";
	  $u = "root";
	  $p = "";
	$dbName = "ventilacion";
	*/
	try {
			$pdo = new PDO("mysql:dbname=".$dbName.";host=".$h.";charset=utf8", $u, $p);
			echo "Good!!";
		}catch (PDOException $e) {
			echo 'Falló la conexión: ' . $e->getMessage();
		}
	
 ?>