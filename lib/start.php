<?php 

require_once 'db/db.php';

$error = [];

$db = new BaseDeDatos();

if(isset($_SESSION)) {
    session_unset();
    session_destroy();
}


if(!empty($_POST["username"])&& !empty($_POST["email"])) {

    if(verifyString($_POST["username"])&& verifyString($_POST["email"])) {

        $email = $_POST["email"];
        $name = $_POST["username"];
        if($db->emailCheck($email)) {
            if($db->login($name, $email)) {
                session_start();
                $_SESSION["email"] = $email;
            } else {
                header("Location: index.php");
                exit();
            }
        } else {
            if($db->insert($name, $email)) {
                session_start();
                $_SESSION["email"] = $email;
            } else {
                header("Location: index.php");
                exit();
            }
        }
    } else {
        $error [] = "Solo se permiten letras, números y los caracteres: @-._";
    }
}


function verifyString($string) {

    $permitidos = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@-_. ';
    $count = 0;

    for($i = 0; $i < strlen($string); $i++) { 
        if(strpos($permitidos, substr($string,$i,1))===false) { 
            return false;
        }else{
            $count++;
        }
    }
    if(strlen($string) == $count) {
        return true;
    }
}

?>