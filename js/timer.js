var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var control;

var Centesimas = "";
var Segundos = "";
var Minutos = "";
var Horas = "";

var countDownDate = "";

$("#timer").innerHTML = "00:00";
console.log("timer loaded");
function inicio () {

	//Start countDown
	countDownDate = new Date();
	countDownDate.setMinutes(countDownDate.getMinutes() + 2);

	//control = setInterval(cronometro,10);
	control = setInterval(countDown,500);

}
function parar () {
	clearInterval(control);

}
function reinicio () {
	clearInterval(control);
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
	Centesimas = ":00";
	Segundos = ":00";
	Minutos = ":00";
	Horas = "00";

}
function countDown(){
	// Get todays date and time
	var now = new Date().getTime();

	// Find the distance between now an the count down date
	var distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Output the result in an element with id="demo"
	//document.getElementById("demo").innerHTML = days + "d " + hours + "h "
	//+ minutes + "m " + seconds + "s ";

	//show countdown
	$("#timer").text("" + pad(minutes,2) + ":" + pad(seconds, 2));

	// If the count down is over, write some text
	if (distance < 0 || $("#timer").text() == "00:00") {
			parar();
			gameOver();
	}

}
function gameOver(){
	$("#timer").text("OVER");
	$( ".panel-tablero" ).effect( "drop", {}, "slow"  );
	$( ".time" ).effect( "drop", {}, "slow"  );
	$( ".panel-score" ).animate(
    {
      width: "100%"
    },
		{
			duration: "slow",
			complete: function(){
				$(".score").before("<h1 class='titulo-over'>Juego Terminado</h1>");
				}
		}
  )
}
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		Centesimas = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos = ":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos = ":"+minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		Horas = horas;
	}
	$("#timer").text("" + Minutos + Segundos);
	//console.log($("#timer").innerHTML);

}
