<?php 
/**
 * Class db
 */

abstract class DB{
	private static $h = "localhost";
	private static $u = "root";
	private static $p = "";
	protected $dbName = "ventilacion";
	protected $pdo;//objeto pdostatement
	protected $sql;//sql
	protected $data = array();//valores devueltos

	//metodos abstractos
	abstract protected function get();
	abstract protected function set();
	abstract protected function delete();
	abstract protected function update();

	private function start(){
		try {
			$this->pdo = new PDO("mysql:dbname=".$this->dbName.";host=".self::$h.";charset=utf8", self::$u, self::$p);
		}catch (PDOException $e) {
			echo 'Falló la conexión: ' . $e->getMessage();
		}
	}

	private function close(){
		$this->pdo = null;
		$this->sth = null;
	}

	protected function runQuery( $param = array() ){
		$this->start();
		$sth = $this->pdo->prepare($this->sql);
		$sth->execute($param);
		$this->data = $sth->fetchAll(PDO::FETCH_OBJ);
		$this->close();
	}

}

/**
* 
*/
class Paciente extends DB{
	
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
	
	
	public function set(){
		$this->sql = "INSERT INTO ventilacion.pacientes(peso, estatura, genero) VALUES ( ?, ?, ? )";
		$this->runQuery( [$this->peso, $this->estatura, $this->genero] );
	}
	public function get($id=""){
		if( $id == "" ){}
		else if($id == "all"){
			$this->sql = "SELECT * FROM ventilacion.pacientes WHERE status = 1";
			$this->runQuery();
			return $this->data;
		}
		else{
			$this->sql = "SELECT * FROM ventilacion.pacientes WHERE id_paciente = ? AND status = 1";
			$this->runQuery([$id]);
			return $this->data;
		}
	}
	public function delete($id = ""){
		if( $id !="" ){
			$this->sql = "UPDATE ventilacion.pacientes SET status = 0 WHERE id_paciente = ?";
			$this->runQuery([$id]);
		}
	}
	public function update($id = ""){
		if( $id != "" ){
			$this->sql = "UPDATE ventilacion.pacientes SET frecuenciaRespiratoria = ?, vt = ?, presionPico = ?, presionMeseta = ?, peep = ? WHERE id_paciente = ? AND status = 1";
			$this->runQuery( [ $this->frecuenciaRespiratoria, $this->vt, $this->presionPico, $this->presionMeseta, $this->peep, $id ] );
		}	
	}

	
}

$paciente = new Paciente();
$paciente->peso = 68;
$paciente->estatura = 170;
$paciente->genero = 'h';
//$paciente->set();

//var_dump( $paciente->get(5) );
//$paciente->delete(2);
$paciente->frecuenciaRespiratoria = 32;
$paciente->vt = 5;
$paciente->presionPico = 10;
$paciente->presionMeseta = 15;
$paciente->peep = 4;

$paciente->update(1);


?>