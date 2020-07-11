<?php

require_once "db/db.php";

if(isset($_POST)){
    $resultado = new BaseDeDatos();
    $valores = $resultado->ranking();
    $myJSON = json_encode($valores);
    echo $myJSON;
}

?>