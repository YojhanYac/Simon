<?php

require_once "db/db.php";

if(isset($_POST["points"])){
    session_start();
    $resultado = new BaseDeDatos();
    $valores = $resultado->updateScore($_POST["points"], $_SESSION["email"]);
    echo $valores;
}

?>