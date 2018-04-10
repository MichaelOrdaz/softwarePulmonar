<?php 
header("Content-type: application/json");
require_once "autoload.php";

$fn = $_POST['fn'];

function paso1($post){

	$paciente = new Paciente();
	$paciente->peso = trim($post['peso'] );
	$paciente->estatura = trim( $post['talla'] );
	$paciente->genero = trim( $post['genero'] );
	$paciente->set();

	return array('status'=>1);

}





$data = $fn($_POST);
echo json_encode($data);
?>