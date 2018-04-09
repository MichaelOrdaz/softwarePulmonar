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
	protected $param = array();//parametros del sql
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

	protected function runQuery(){
		$this->start();
		$sth = $this->pdo->prepare($this->sql);
		$sth->execute($this->param);
		$this->data = $sth->fetchAll(PDO::FETCH_OBJ);
		$this->close();
	}

}

/**
* 
*/
class Paciente extends DB{
	
	protected function set(){

	}
	protected function get(){

	}
	protected function delete(){

	}
	protected function update(){

	}

}

$paciente = new Paciente()

?>