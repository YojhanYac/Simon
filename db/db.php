<?php

class BaseDeDatos {

    private $server = "127.0.0.1";
    private $user = "root";
    private $password = "";
    private $database = "db_simon";
    private $port = "3306";
    public  $conexion;

    public function __construct(){
        $this->conexion = new mysqli($this->server, $this->user, $this->password,$this->database) or die(mysql_error());
        $this->conexion->set_charset("utf8");
    }

    function insert($name, $email) {
        $resultado = $this->conexion->query("INSERT INTO users_simon (`name`, `email`) VALUES ('$name', '$email')") or die($this->conexion->error);
        return ($this->conexion->affected_rows == 1) ? true : false;
    }

    public function emailCheck($email) {
        $resultado = $this->conexion->query("SELECT * FROM users_simon WHERE email = '$email'") or die($this->conexion->error);
        return ($resultado->num_rows > 0) ? true : false;
    }

    public function username($email) {
        $resultado = $this->conexion->query("SELECT * FROM users_simon WHERE email = '$email'") or die($this->conexion->error);
        $arrayData = $resultado->fetch_array(MYSQLI_ASSOC);
        return (!empty($arrayData["name"])) ? $arrayData["name"] : false;
    }

    public function login($name, $email) {

        $resultado = $this->conexion->query("SELECT * FROM users_simon WHERE email = '$email' AND name = '$name'") or die($this->conexion->error);
        return ($resultado->num_rows > 0) ? true : false;
    }

    public function ranking() {
        $resultado = $this->conexion->query("SELECT * FROM users_simon ORDER BY points DESC LIMIT 10") or die($this->conexion->error);
        return ($resultado->num_rows > 0) ? mysqli_fetch_all($resultado, MYSQLI_ASSOC) : false;
    }

    public function updateScore($points, $email) {
        $resultado = $this->conexion->query("SELECT * FROM users_simon WHERE email = '$email'") or die($this->conexion->error);
        $arrayData = $resultado->fetch_array(MYSQLI_ASSOC);
        if($points > $arrayData["points"]) {
            $this->conexion->query("UPDATE users_simon SET points = $points WHERE email = '$email'") or die($this->conexion->error);
            return ($this->conexion->affected_rows == 1) ? true : false;
        } else {
            return false;
        }
    }
}

?>