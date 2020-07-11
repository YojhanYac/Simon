 
miStorage = window.localStorage;
var coloresDisponibles = ["red", "green", "yellow", "blue"];
var secuenciaColores = [];
var coloresUsadosUsuario = [];
localStorage.setItem('coloresUsadosUsuario', JSON.stringify(coloresUsadosUsuario));
localStorage.setItem('coloresSistema', JSON.stringify(secuenciaColores));
var sis = JSON.parse(localStorage.getItem('coloresSistema'));
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c4 = document.getElementById("c3");
var c3 = document.getElementById("c4");
var c = document.getElementById("c");
var cuadrantes = [c1, c2, c3, c4];
var turnoUsuario = 0;
var turnoSistema = 0
var repetir = 0;
var turnoUsuarioJuego = 0;
var setSonido = 0;
var setTeclado = 0;
var setSonidoDefault = "Sonido: si";
var setTecladoDefault = "Modo teclado: no";
localStorage.setItem('setSonidoSistema', JSON.stringify(setSonidoDefault));
localStorage.setItem('setTecladoSistema', JSON.stringify(setTecladoDefault));
var sonidoSis = JSON.parse(localStorage.getItem('setSonidoSistema'));
var tecladoSis = JSON.parse(localStorage.getItem('setTecladoSistema'));

//funcion de: https://stackoverrun.com/es/q/1377364
document.onkeydown = function (e) {

    if (turnoUsuario == 1) {
        switch (e.keyCode) {
            case 37:
                modificadorDeCuadrantes("blue");
                break;
            case 38:
                modificadorDeCuadrantes("red");
                break;
            case 39:
                modificadorDeCuadrantes("green");
                break;
            case 40:
                modificadorDeCuadrantes("yellow");
                break;
        }
    }
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function secuenciaColoresSis() {
    var agregarColor = getRndInteger(0, 4);
    if(repetir != 1) {
        secuenciaColores.push(coloresDisponibles[agregarColor]);
    }
}

function secuenciaUsuario() {
    coloresUsadosUsuario = [];
    if (turnoUsuario == 1) {
        c1.addEventListener("click", c1change);
        c2.addEventListener("click", c2change);
        c4.addEventListener("click", c3change);
        c3.addEventListener("click", c4change);
    }
}

function sonido() {
    if(setSonido == 0) {
        document.getElementById("opcion1").innerHTML = "Sonido: no";
        setSonidoDefault = "Sonido: no";
        localStorage.setItem('setSonidoSistema', JSON.stringify(setSonidoDefault));
        sonidoSis = JSON.parse(localStorage.getItem('setSonidoSistema'));
        //volumen https://www.w3schools.com/tags/av_prop_volume.asp
        document.getElementById("fa").volume = 0.0;
        document.getElementById("la").volume = 0.0;
        document.getElementById("mi").volume = 0.0;
        document.getElementById("si").volume = 0.0;
        setSonido++;
    } else {
        document.getElementById("opcion1").innerHTML = "Sonido: si";
        setSonidoDefault = "Sonido: si";
        localStorage.setItem('setSonidoSistema', JSON.stringify(setSonidoDefault));
        sonidoSis = JSON.parse(localStorage.getItem('setSonidoSistema'));
        document.getElementById("fa").volume = 1.0;
        document.getElementById("la").volume = 1.0;
        document.getElementById("mi").volume = 1.0;
        document.getElementById("si").volume = 1.0;
        setSonido = 0;
    }
}
function teclado() {
    if(setTeclado == 0) {
        document.getElementById("opcion2").innerHTML = "Modo teclado: si";
        setTecladoDefault = "Modo teclado: si";
        localStorage.setItem('setTecladoSistema', JSON.stringify(setTecladoDefault));
        tecladoSis = JSON.parse(localStorage.getItem('setTecladoSistema'));
        setTeclado++;
    } else {
        document.getElementById("opcion2").innerHTML = "Modo teclado: no";
        setTecladoDefault = "Modo teclado: no";
        localStorage.setItem('setTecladoSistema', JSON.stringify(setTecladoDefault));
        tecladoSis = JSON.parse(localStorage.getItem('setTecladoSistema'));
        setTeclado = 0;
    }
}

function opciones() {
    document.getElementById("opcion2").innerHTML = tecladoSis;
    document.getElementById("opcion1").innerHTML = sonidoSis;
    document.getElementById("opcion3").innerHTML = "Salir";
    document.getElementById("opcion1").onclick = sonido;
    document.getElementById("opcion3").onclick = salir;
    document.getElementById("opcion2").onclick = teclado;
}

function ranking() {
    document.getElementById("exampleModal").removeAttribute("hidden");
    document.getElementById("exitRanking").onclick = salir;
    $.ajax({
        url: 'ranking.php',
        type: "POST",
        datatype: 'json',
        success: function (respuesta){
            var stringJSON = JSON.parse(respuesta);
            for(var i = 0; i < 10; i++ ) {
                var select = "top-" + i;
                document.getElementById(select).innerHTML = stringJSON[i].name + "  " + stringJSON[i].points;
            }
        }
    });
}

function salir() {
    document.getElementById("exampleModal").setAttribute("hidden", "true");
    document.getElementById("opcion2").innerHTML = "Jugar";
    document.getElementById("opcion1").innerHTML = "Opciones";
    document.getElementById("opcion3").innerHTML = "Ranking";
    document.getElementById("opcion1").removeEventListener("click", repetirSecuencia);
    document.getElementById("opcion1").onclick = opciones;
    document.getElementById("opcion3").onclick = ranking;
    document.getElementById("opcion2").onclick = recorrer;

    c1.style.fill = "#ff0000";
    c2.style.fill = "#008000";
    c4.style.fill = "#0000ff";
    c3.style.fill = "#ffff00";

    turnoSistema = 0;
    turnoUsuarioJuego = 0;
    coloresUsadosUsuario = [];
    coloresSistema = [];
    secuenciaColores = [];
}

async function recorrer() {
    document.getElementById("opcion2").innerHTML = "Secuencia...";
    document.getElementById("opcion2").onclick = recorrer;
    document.getElementById("opcion1").innerHTML = "Repetir";
    document.getElementById("opcion3").innerHTML = "Salir";
    document.getElementById("opcion3").onclick = salir;

    if(turnoSistema == 0){
        turnoSistema = 1;
        turnoUsuarioJuego = 0;
        coloresUsadosUsuario = [];

        c1.removeEventListener("click", c1change);
        c2.removeEventListener("click", c2change);
        c4.removeEventListener("click", c3change);
        c3.removeEventListener("click", c4change);

        turnoUsuario = 0;
        secuenciaColoresSis();
        var coloresVuelta = [];
        var coloresSistema = secuenciaColores;

        var coloresVueltaUno = ["#ff0000", "#00ff0050", "#ffff0050", "#0000ff50"];
        var coloresVueltaDos = ["#ff000050", "#00ff00", "#ffff0050", "#0000ff50"];
        var coloresVueltaTres = ["#ff000050", "#00ff0050", "#ffff00", "#0000ff50"];
        var coloresVueltaCuatro = ["#ff000050", "#00ff0050", "#ffff0050", "#0000ff"];

        coloresSecuencia(coloresSistema, coloresVueltaDos, coloresVueltaUno, coloresVueltaTres, coloresVueltaCuatro);
        document.getElementById("opcion2").innerHTML = "Tu turno!";
        document.getElementById("opcion1").addEventListener("click", repetirSecuencia);
        turnoUsuario = 1;
        repetir = 0;
        secuenciaUsuario();
    }
}

function repetirSecuencia() {
    repetir = 1;
    turnoSistema = 0;
    recorrer();
}

async function coloresSecuencia(coloresSistema, coloresVueltaDos, coloresVueltaUno, coloresVueltaTres, coloresVueltaCuatro){
    for (var x = 0; x < coloresSistema.length; x++) {
        if (coloresSistema[x] == "red") {
            coloresVuelta = coloresVueltaUno;
            document.getElementById("fa").currentTime = 0;
            document.getElementById("fa").play();
        } else if (coloresSistema[x] == "green") {
            coloresVuelta = coloresVueltaDos;
            document.getElementById("la").currentTime = 0;
            document.getElementById("la").play();
        } else if (coloresSistema[x] == "yellow") {
            coloresVuelta = coloresVueltaTres;
            document.getElementById("mi").currentTime = 0;
            document.getElementById("mi").play();
        } else if (coloresSistema[x] == "blue") {
            coloresVuelta = coloresVueltaCuatro;
            document.getElementById("si").currentTime = 0;
            document.getElementById("si").play();
        }

        for (var i = 0; i < 4; i++) {
            cuadrantes[i].style.fill = coloresVuelta[i];
        }
        await new Promise(r => setTimeout(r, 500));
    }
    coloresVuelta = ["#ff000050", "#00ff0050", "#ffff0050", "#0000ff50"];
    for (var i = 0; i < 4; i++) {
        cuadrantes[i].style.fill = coloresVuelta[i];
    }
}

function c4change() {
    modificadorDeCuadrantes("yellow")
}

function c3change() {
    modificadorDeCuadrantes("blue")
}

function c2change() {
    modificadorDeCuadrantes("green")
}

function c1change() {
    modificadorDeCuadrantes("red");
}

async function modificadorDeCuadrantes(cuadrante){
    if(cuadrante == "red") {
        coloresVuelta = ["#ff0000", "#00ff0050", "#ffff0050", "#0000ff50"];
        var nota = "fa";
    } else if (cuadrante == "green") {
        coloresVuelta = ["#ff000050", "#00ff00", "#ffff0050", "#0000ff50"];
        var nota = "la";
    } else if (cuadrante == "yellow"){
        coloresVuelta = ["#ff000050", "#00ff0050", "#ffff00", "#0000ff50"];
        var nota = "mi";
    } else if (cuadrante == "blue"){
        coloresVuelta = ["#ff000050", "#00ff0050", "#ffff0050", "#0000ff"];
        var nota = "si";
    }
    coloresSistema = secuenciaColores;
    document.getElementById(nota).currentTime = 0;
    document.getElementById(nota).play();
    for (var i = 0; i < 4; i++) {
        cuadrantes[i].style.fill = coloresVuelta[i];
    }
    coloresUsadosUsuario.push(cuadrante);
    if (coloresUsadosUsuario[turnoUsuarioJuego] == coloresSistema[turnoUsuarioJuego]) {
        document.getElementById("opcion2").innerHTML = "Bien!";
        turnoUsuarioJuego++;
    } else {
        document.getElementById("opcion2").innerHTML = "De nuevo!";
        turnoUsuarioJuego = 0;
        y = coloresSistema.length + 2;
        coloresUsadosUsuario = [];
    }
    if ((turnoUsuarioJuego) == coloresSistema.length) {
        document.getElementById("opcion2").innerHTML = "Superado!";
        $.ajax({
            url: 'userdata.php',
            type: "POST",
            datatype: 'json',
            data: {
                points: turnoUsuarioJuego
            }
        });
        await new Promise(r => setTimeout(r, 1500));
        document.getElementById("opcion2").innerHTML = "Puntos: " + turnoUsuarioJuego;
        await new Promise(r => setTimeout(r, 1500));
        document.getElementById("opcion2").innerHTML = "Siguiente?";
        turnoSistema = 0;
    }
    await new Promise(r => setTimeout(r, 500));
    coloresVuelta = ["#ff000050", "#00ff0050", "#ffff0050", "#0000ff50"];
    for (var i = 0; i < 4; i++) {
        cuadrantes[i].style.fill = coloresVuelta[i];
    }
}