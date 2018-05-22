<?php  
/**
* 
*/
require_once "autoload.php"; 
class Paciente extends DB{
	/*
	protected $id_paciente;
	//public $nombre;
	public $peso;
	public $estatura;
	public $genero;
	public $frecuenciaRespiratoria;
	public $vt;
	public $presionPico;
	public $presionMeseta;
	public $peep;
	public $poderMecanico;
	public $fio2;
	*/
	
	
	public function set(){
		$this->sql = "INSERT INTO pacientes(peso, estatura, genero, expediente) VALUES ( ?, ?, ?, ? )";
		$this->runQuery( [$this->peso, $this->estatura, $this->genero, $this->expediente] );
		return $this->data;
	}
	public function get($id=""){
		if( $id == "" ){}
		else if($id == "all"){
			$this->sql = "SELECT * FROM pacientes WHERE status = 1";
			$this->runQuery();
			return $this->data;
		}
		else{
			$this->sql = "SELECT * FROM pacientes WHERE id_paciente = ? AND status = 1";
			$this->runQuery([$id]);
			return $this->data;
		}
	}
	public function delete($id = ""){
		if( $id !="" ){
			$this->sql = "UPDATE pacientes SET status = 0 WHERE id_paciente = ?";
			$this->runQuery([$id]);
			return $this->data;
		}
	}

	public function deleteExpediente($exp = ""){
		if( $exp !="" ){
			$this->sql = "UPDATE pacientes SET status = 0 WHERE expediente = ?";
			$this->runQuery([$exp]);
			return $this->data;
		}
	}

	public function update($id = ""){
		if( $id != "" ){
			$this->sql = "UPDATE pacientes SET frecuenciaRespiratoria = ?, vt = ?, presionPico = ?, presionMeseta = ?, peep = ?, poderMecanico = ?, vt2 = ? WHERE id_paciente = ? AND status = 1";
			$this->runQuery( [ $this->frecuenciaRespiratoria, $this->vt, $this->presionPico, $this->presionMeseta, $this->peep, $this->poderMecanico, $this->vt2, $id ] );
			return $this->data;
		}
	}

	public function updateFio($id = ""){
		if( $id != "" ){
			$this->sql = "UPDATE pacientes SET fio2 = ? WHERE id_paciente = ? AND status = 1";
			$this->runQuery( [ $this->fio2, $id ] );
			return $this->data;
		}
	}

	public function groupByExpediente(){

		$this->sql = "SELECT expediente FROM pacientes WHERE status = 1 GROUP BY expediente";
		$this->runQuery();
		return $this->data;

	}

	public function rowPaciente($exp = ""){
		if( $exp != "" ){
			$this->sql = "SELECT * FROM pacientes WHERE expediente = ? AND status = 1";
			$this->runQuery( [$exp] );
			return $this->data;
		}
	}

}
?>