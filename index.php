<?php
    require_once "lib/start.php";
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="icon/icon.svg">
        <link rel="stylesheet" href="css/style.css">
        <title>Simon</title>
    </head>
    <body>
        <main>

            <?php 
                if(!isset($_SESSION["email"])) { ?>
                    <form action="" method="POST" id="register-name" style="color: white; position: absolute; z-index: 1; display: flex; flex-direction: row; flex-wrap: wrap; background: white; text-align: center; width: 60%">
                        <label for="username" style="width: 100%; color: black; margin: 2.5% 5% 1% 5%; font-size: 3rem">Login y registro</label>
                        <input type="text" placeholder="Nombre de usuario" name="username" style="width: 100%; color: black; margin: 1% 5% 1% 5%; height: 30px;">
                        <input type="text" placeholder="Correo" name="email" style="width: 100%; color: black; margin: 1% 5% 2.5% 5%; height: 30px;">
                        <?php
                            if(!empty($error)) { 
                                echo "<span>";
                                for($i = 0; $i < count($error); $i++) {
                                    echo $error[$i]."<br>";
                                }
                                echo"</span>";
                            }
                        ?>
                        <button type="sumbit" style="width: 100%; margin: 1% 5% 5% 5%; height: 30px;">Ingresar</button>
                    </form action="" method="POST">
            <?php } ?>

            <div class="modal fade" id="exampleModal" hidden style="color: white; position: absolute; z-index: 1; ">
                <div style="width:75vw; height: auto; max-width:500px; background: red;">
                    <ul class="ul-ranking">
                        <li class="ranking title-ranking">Ranking</li>
                        <li class="ranking" id="top-0">1</li>
                        <li class="ranking" id="top-1">2</li>
                        <li class="ranking" id="top-2">3</li>
                        <li class="ranking" id="top-3">4</li>
                        <li class="ranking" id="top-4">5</li>
                        <li class="ranking" id="top-5">6</li>
                        <li class="ranking" id="top-6">7</li>
                        <li class="ranking" id="top-7">8</li>
                        <li class="ranking" id="top-8">9</li>
                        <li class="ranking" id="top-9">10</li>
                        <li id="exitRanking" class="ranking button-ranking">Salir</li>
                    </ul>
                </div>
            </div>

            <div id="menu">
                <ul>
                    <li id="opcion1" onclick="opciones()">Opciones</li>
                    <li id="opcion2" onclick="recorrer()">Jugar</li>
                    <li id="opcion3" onclick="ranking()">Ranking</li>
                </ul>
            </div>

            <svg viewbox="0 0 345 315">
                <path id="c1" d=" M 30 5 L 140 5 a 15 15 0 0 1 15 15 L 155 30 a 10 10 0 0 1 -10 10 a 90 90 1 0 0 -90 90 a 10 10 0 0 1 -10 10 L 30 140 a 10 10 0 0 1 -10 -10 L 20 15 a 10 10 0 0 1 10 -10 "/>
                <path id="c2" d=" M 200 5 L 310 5 a 15 15 0 0 1 15 15 L 325 130 a 10 10 0 0 1 -10 10 L 300 140 a 10 10 0 0 1 -10 -10 a 90 90 1 0 0 -90 -90 a 10 10 0 0 1 -10 -10 L 190 15 a 10 10 0 0 1 10 -10 "/>
                <path id="c3" d=" M 30 175 L 45 175 a 10 10 0 0 1 10 10 a 90 90 1 0 0 90 90 a 10 10 0 0 1 10 10 L 155 295 a 15 15 0 0 1 -15 15 L 30 310 a 10 10 0 0 1 -10 -10 L 20 185 a 10 10 0 0 1 10 -10 "/>
                <path id="c4" d=" M 300 175 L 315 175 a 10 10 0 0 1 10 10 L 325 300 a 10 10 0 0 1 -10 10 L 205 310 a 15 15 0 0 1 -15 -15 L 190 285 a 10 10 0 0 1 10 -10 a 90 90 1 0 0 90 -90 a 10 10 0 0 1 10 -10 "/>
            </svg>

            <audio src="sound/fa.wav" id="fa"></audio>
            <audio src="sound/la.wav" id="la"></audio>
            <audio src="sound/mi.wav" id="mi"></audio>
            <audio src="sound/si.wav" id="si"></audio>
        </main>
        <script src="js/script.js"></script>
    </body>
</html>

