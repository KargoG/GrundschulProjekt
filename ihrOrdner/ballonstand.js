
var anzahlBallons = 9;
var kleinstesErgebnissBallons = 0;
var größtesErgebnissBallons = 21;
var lebenBallons = 1;
var aufgabenRichtigBallons = 0;
var aufgabenZielBallons = 4;

function setUpBallonwerfen()
{
	$("body").css(
	{
		// Das Bild muss evtl noch geändert werden für den Stand ----------------------------------------------
		"backgroundImage" : "url('Dosenstand/Dosenstand.png')"
	});


	// Ab hier werden die Ballons initialisiert
	for(var i = 1; i<anzahlBallons+1; i++)
	{

		$("body").append("<div class='ballons' id='"+ i +"'></div>");

		// Hier wird den Ballons unterschiedliche Bilder gegeben
		$((".ballons#" + i)).css(
		{
			"top" : (100 + 125*(i%3)) + "px",
			"backgroundImage" : "url('Luftballonstand/Luftballon_" + ((i%6)+1) + ".png')"
		});

		//hier wird die Position der Dosen in einem Pyramiden-Muster fest gelegt

		if(i < 4)
			$(".ballons#"+i).css({"left" : "350px"});
		if(i > 3 && i < 7)
			$(".ballons#" + i).css({"left" : "550px"});
		if(i > 6)
			$(".ballons#" + i).css({"left" : "750px"});


		// Hier wird der aktuellen Dose ein Wert als mögliches Ergebniss zugewiesen
		do {
			var neueZahl = true;
			$(".ballons#" + i).text(zufallsZahlen(kleinstesErgebnissBallons,
				größtesErgebnissBallons));
			for(var j = 1; j < i; j++)
			{
				if($(".ballons#" + j).text() == $(".ballons#" + i).text())
				{
					neueZahl = false;
				}
			}
		} while (!neueZahl);


		// Hier erhalten die Dosen die Möglichkeit, als Antworten, angeklickt zu werden
		$(".ballons#"+i).click(function(){

			if(!amWarten) // Die abfrage sichert, dass während der animation usw. nichts gecklickt werden kann
			{
				amWarten = true;
				lebenBallons--; // Da die Versuche von vornerein fest sind wird bei jedem Klick/ Wurf ein Leben abgezogen

				if(parseInt($(this).text()) == lösung) // Dies ist der Fall der Richtig angeklickten Lösung
				{
					$(".aufgabe").text("Richtig! Das hast du sehr gut gemacht!");
					aufgabenRichtigBallons++;
          ballonsRichtig++;

          var ballon = $(this);

					$("#"+(lebenBallons+1)+".pfeil").animate({
						top : [parseInt($(this).css("top")) + 50 + "px", "easeOutBack"],
						left : parseInt($(this).css("left")) + 35 + "px"
					},1500,"swing", function(){

						$("body").append("<div class='schild s" +lebenBallons + "' id='richtig'></div>");
            $(".s"+lebenBallons).css({"top" : ballon.css("top"), "left" : ballon.css("left")});
            ballon.css({"background-image" : "url('Luftballonstand/Luftballon_" +
            ((parseInt(ballon.attr("id"))%6)+1) + "_geplatzt.png'"});

            $(this).fadeOut(1500);
            ballon.fadeOut(1500, function(){
  						if(lebenBallons>0 && aufgabenRichtigBallons < aufgabenZielBallons)
              {
  							window.setTimeout(aufgabeErzeugenPlus, 1500);
              }
  					});
					});
        }
				else { // Dies ist der Fall der Falsch angeklickten Lösung
					$(".aufgabe").text("Das ist nicht Richtig! " + zahl1 + " + " +
					zahl2 + " = " + lösung);

          var ballon = $(this);

					$("#"+(lebenBallons+1)+".pfeil").animate({
						top : [parseInt($(this).css("top")) + 50 + "px", "easeOutBack"],
						left : parseInt($(this).css("left")) + 35 + "px"
					},1500,"swing", function(){

						$("body").append("<div class='schild s" +lebenBallons + "' id='falsch'></div>");
            $(".s"+lebenBallons).css({"top" : ballon.css("top"), "left" : ballon.css("left")});
            ballon.css({"background-image" : "url('Luftballonstand/Luftballon_" +
            ((parseInt(ballon.attr("id"))%6)+1) + "_geplatzt.png'"});

            $(this).fadeOut(1500);
            ballon.fadeOut(1500, function(){
              if(lebenBallons>0 && aufgabenRichtigBallons < aufgabenZielBallons)
              {
                window.setTimeout(aufgabeErzeugenPlus, 1500);
              }
  					});
					});


				}

				if(aufgabenRichtigBallons >= aufgabenZielBallons) // Hier wird nach dem Wurf geprüft ob man die benötigte anzahl an richtigen Würfen erreicht wurde
				{
					$(".aufgabe").text("Bravo! Du hast Gewonnen!");
					window.setTimeout(removeBallonwerfen, 3000);
				}
				else if (lebenBallons < 1) { // Hier wird, falls der vorrige Fall NICHT eingetroffen ist geguckt ob alle Würfe verbraucht wurden
					$(".aufgabe").text("Du hast alle Bälle aufgebraucht! Insgesammt hast du "
					+ aufgabenRichtigBallons + " Aufgaben Richtig!");
					window.setTimeout(removeBallonwerfen, 3000);
				}
			}

		});
	}

	// In diesem div wird die Aufgabe den Spielern angezeigt
	$("body").append("<div class='aufgabe'></div>")

	// Ab hier werden Bälle initialisiert ----------------------------------------

	for(var i = 1; i < lebenBallons+1; i++)
	{

		// Hier werden die bälle initialisiert
		$("body").append("<div class='pfeil' id='"+ i +"'></div>");

		// Das hier muss noch durch die Pfeile ersetzt werden (bälle bleiben ERSTMAL)-----------------------------------
		$("#"+ i +".pfeil").css(
		{
			"backgroundImage" : "url('Luftballonstand/Dartz.png')",
			"left" : (890 - 40*(i-1)) + "px"
		});

		if(i%2 == 1) // in dieser Abfrage werden alle UNGERADEN bälle angesprochen
		{
			// Hier werden die angesprochenen bälle Optisch nach hinten versetzt um einen 3 Dimensionalen eindruck zu erzeugen
			$("#"+ i +".ball").css(
			{
				"top" : "460px",
				"height" : "60px",
				"width" : "60px",
				"background-size" : "60px, 60px",
				"z-index" : "15"
			});
		}

	}

	//Hier wird die erste Aufgabe initialisiert
	aufgabeErzeugenPlus();
}

function removeBallonwerfen()
{
  ballonsGespielt = true;


	$(".ballons").remove();
	$(".pfeil").remove();
  $(".schild").remove();
	$(".aufgabe").remove();

	lebenBallons = 4;
	aufgabenRichtigBallons = 0;
	amWarten = false;

	setUpAuswahlscreen();
}


function aufgabeErzeugenPlus()
{
	do {
		lösungsBallon = ".ballons#" + parseInt(Math.random()*anzahlBallons+1);
	} while ($(lösungsBallon).css("display")=="none");
	lösung = parseInt($(lösungsBallon).text());
	zahl1 = zufallsZahlen(0, lösung);
	zahl2 = lösung - zahl1;

	$(".aufgabe").text("Was ergibt " + zahl1 + " + " + zahl2 + "?");

	amWarten = false;
}
