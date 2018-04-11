<?php 
header("Content-type: application/json");
require_once "autoload.php";


$fn = $_POST['fn'];

function paso1($post){

	session_start();
	$paciente = new Paciente();
	$paciente->peso = trim($post['peso'] );
	$paciente->estatura = trim( $post['talla'] );
	$paciente->genero = trim( $post['genero'] );
	$id = $paciente->set();
	$_SESSION['id'] = $id;
	return array('id'=>$id);

}

function getPaciente($post){
	session_start();
	$id = $_SESSION['id'];
	$paciente = new Paciente();
	$data = $paciente->get($id);
	return $data;
}

function paso2($post){

	session_start();

	$paciente = new Paciente();
	$paciente->frecuenciaRespiratoria = $post['fr'];
	$paciente->vt = $post['vt'];
	$paciente->presionPico = $post['pico'];
	$paciente->presionMeseta = $post['meseta'];
	$paciente->peep = $post['peep'];
	$paciente->poderMecanico = $post['poderMecanico'];
	$affec = $paciente->update( $_SESSION['id'] );
	return  array('filas' => $affec );;
}

$data = $fn($_POST);
echo json_encode($data);
?>