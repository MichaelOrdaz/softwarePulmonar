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
	$expediente = $post['exp'] == '' ? 'desconocido' : $post['exp'];
	$paciente->expediente = trim( $expediente );

	$id = $paciente->set();
	$_SESSION['id'] = $id;
	if($id){
		return array('status'=>1, 'id'=>$id);
	}
	else{
		return array('status'=>0, 'msg'=>'error en la inserción');
	}

}

function getPaciente($post){
	session_start();
	if( isset( $_SESSION['id'] ) ){
		$id = $_SESSION['id'];
		$paciente = new Paciente();
		$data = $paciente->get($id);
	}
	else{
		$data = array('status'=>'0');
	}
	return $data;
}

function groupByExpediente($post){

	session_start();
	$paciente = new Paciente();
	$data = $paciente->groupByExpediente();
	return $data;

}

function rowPaciente($post){
	session_start();
	$paciente = new Paciente();
	$data = $paciente->rowPaciente($post['expediente']);
	if($data){
		return array('status'=>1, 'data'=>$data );
	}
	else{
		return array('status'=>0);
	}
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
	$paciente->vt2 = $post['vt2'];
	$affec = $paciente->update( $_SESSION['id'] );
	return array('filas' => $affec );
}

function saveFio($post){
	session_start();

	$paciente = new Paciente();
	$paciente->fio2 = $post['fio2'];
	$affec = $paciente->updateFio( $_SESSION['id'] );
	return array('filas'=> $affec);
	
}

function deleteExpediente($post){

	$paciente = new Paciente();
	$affec = $paciente->deleteExpediente( $post['expediente'] );
	if($affec > 0 ){
		return array('status'=>1, 'filas'=> $affec, 'msg'=>'el registro se elimino');
	}
	else{
		return array('status'=>0, 'filas'=> $affec, 'msg'=>'No se encontro el registro');
	}


}


function deleteRow($post){

	$paciente = new Paciente();
	$affec = $paciente->delete( $post['row'] );
	if($affec > 0 ){
		return array('status'=>1, 'filas'=> $affec, 'msg'=>'el registro se elimino');
	}
	else{
		return array('status'=>0, 'filas'=> $affec, 'msg'=>'No se encontro el registro');
	}

}



$data = $fn($_POST);
echo json_encode($data);
?>