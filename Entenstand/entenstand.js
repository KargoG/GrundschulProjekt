var allducks = 6;
var lebenDuck = 4;
var loesung1 = 0;
var loesung2 = 0;
var loesungsDuck = "";
var loesungTemp = 0;

function setUpEntenstand(){
//kleinstesErgebniss = 1;
//größtes Ergebniss = 500;
	$("body").html(
		"<!--hier sind die Enten -->\
			<div class='clickDuck'>\
				<p class='zahl' id='zahl1'></p>\
				<img src='duck.png' class='duck'		alt='duck_left'  width='150' height='150' id='duck1'>\
			</div>	\
		\
			<div class='clickDuck'>\
				<p class='zahl' id='zahl2'></p>\
				<img src='duckinverted.png' class='duck' alt='duck_right' width='150' height='150' id='duck2'>\
			</div>\
		\
			<div class='clickDuck'>	\
				<p class='zahl' id='zahl3'></p>\
				<img src='duck.png' class='duck' alt='duck_left'  width='150' height='150' id='duck3'>\
			</div>\
		\
			<div class='clickDuck'>	\
				<p class='zahl' id='zahl4'></p>\
				<img src='duckinverted.png' class='duck' alt='duck_right' width='150' height='150' id='duck4'>\
			</div>\
		\
			<div class='clickDuck'>\
				<p class='zahl' id='zahl5'></p>\
				<img src='duck.png'	class='duck' alt='duck_left'  width='150' height='150' id='duck5'>\
			</div>\
		\
			<div class='clickDuck'>	\
				<p class='zahl' id='zahl6'></p>\
				<img src='duckinverted.png' class='duck' alt='duck_right' width='150' height='150' id='duck6'>\
			</div>\
		\
		<!---- Das sind die leben--->\
		<img src='duck.png'  class='ducklife' width='50' height='50' id='ducklife1'>\
		<img src='duck.png'  class='ducklife' width='50' height='50' id='ducklife2'>\
		<img src='duck.png'  class='ducklife' width='50' height='50' id='ducklife3'>\
		<img src='duck.png'  class='ducklife' width='50' height='50' id='ducklife4'>\
		\
			<div id='aufgabe'>\
				<p></p>\
			</div>\
			<div id='aufgabeFalsch'>\
				<p></p>\
			</div>");		
			
	var auswahlDesSpiels = zufallsZahlen(1,2);
	if(auswahlDesSpiels == 1)  //ob man halbiert oder verdoppelt
		{
			generiereAufgabenDuck();
		$(".clickDuck").click(function()		// damit man auf die enten Klicken kann mit feedback
		{	
				//$(".ducklife").click(function(){return false;});	//damit man nicht auf die Leben Klciken kann 
				//var temp = $(this).text();
				
			if(loesungTemp == parseInt($(this).children("p").text()) )
			{	
				$(this).children().hide();
				$(this).find("img").attr("src","loesung_true.png");	//feedbeack
				$(this).find("img").show();
				$("#aufgabeFalsch").text("Das ist Richtig! "+ $(this).find("p").text()).css({"color":"green"});
				window.setTimeout(generiereAufgabenDuck, 1500);
				window.setTimeout(function(){$(this).find("img").attr("src","duck.png");
				$("p").show();},1500);
			}
				/*else if(lebenDuck == 1)
				{
					$("body").appand("<p>Pass auf du hast nur noch ein Leben !!! wenn du kein Lbene mehr hast wirst du wieder zurückgeschickt!</p>").css(
					{"position":"absolute",
					 "z-index":"60",
					 "top":"100px",
					 "left":"100px",
					 "color":"red"
					});
					window.setTimeout(generiereAufgabenDuck, 2000);
				}*/
			else
			{
				console.log("#ducklife"+lebenDuck);
				$("#ducklife"+lebenDuck).hide();
				
				$(this).hide();
				$(this).find("img").attr("src","loesung_false.png");//feedback
				$(this).show();
				lebenDuck--;
				$("#aufgabeFalsch").text("Das ist nicht Richtig! " + $(this).find("p").text()+ " Pass auf deine Leben auf -->").css({"color":"red"});
			}
		});
	}
});

		/*else
		{
			for(var i = 1; i<allducks+1; i++)
			{
				//halbieren
				do{
				var neueZahl = true;
					var temp = zufallsZahlen(2,250);
					
					if(temp % 2 != 0)
					{// damit keine kommazahlehn entstehen !
						temp++;
					}
					var neueZahl = true;
					$("#zahl" + i).text(temp);
					for(var j = 1; j < i; j++)
					{
						if($("#zahl" + j).text() == $("#zahl" + i).text())
						{
							neueZahl = false;
						}
					}
				}while (!neueZahl);
				
				var loesungsDuck = "#zahl" + parseInt(Math.random()*allducks+1);
				loesung2 = parseInt($(loesungsDuck).text());
				loesung2 *= 2;			
				
				
				$("#aufgabe").text("Was ist das Doppelte der Zahl " + loesung2 + " ?");				
			}
			$(".clickDuck").click(function()
				{
					if($("#zahl").text() == loesung2 && lebenDuck >0)
					{
						$(this).hide("fast");
						$(this).attr("src","loesung_true.png");
						$(this).show("fast");
					}
					else
					{
						$(this).hide("fast");
						$("img").attr("src","loesung_false.png");
						$(this).show("fast");
						lebenDuck--;
					}
				});	
		}*/

function generiereAufgabenDuck()
{
	
	for(var i = 1; i<allducks+1; i++)
			{
				
				if(i % 2 == 0 ){
					if(!$("#duck"+i).attr("src","duckinverted.png")){ // ist ein feature!
					$("#duck"+i).attr("src","duckinverted.png");
					}
				}else{
					if(!$("#duck"+i).attr("src","duck.png")){
					$("#duck"+i).attr("src","duck.png");
					}
				}
			//verdoppeln
				do
				{
					var neueZahl = true;
					var temp = zufallsZahlen(1,500);
					
					if(temp % 2 != 0)// damit keine kommazahlehn entstehen !
					{
						temp++;
					}
						
					$("#zahl" + i).text(temp);	//Zahlen auffüllen
					for(var j = 1; j < i; j++)
					{
						if($("#zahl" + j).text() == $("#zahl" + i).text())
						{
							neueZahl = false;
						}
					}
				} while (!neueZahl);
				
				loesungsDuck = "#zahl" + parseInt(Math.random()*allducks+1);	//um die Lösung herauszufinden
				loesung1 = parseInt($(loesungsDuck).text());
				loesungTemp = loesung1;	//für die textbox mit der Lösung 
				loesung1 /= 2;
				$("#aufgabe").text("Was ist das Doppelte der Zahl " + loesung1 + " ?");
			}
}
/**
* Die Funktion "zufallsZahlen" erzeugt einen Zufallswert zwischen 2 übergebenen
* Zahlen. Die erste Zahl, die den Parameter min betitelt, ist die untere Grenze.
* Diese ist bei der berechnung des Wertes INBEGRIFFEN. Die zweite Zahl,
* die den Parameter max betitelt ist die obere Grenze. Diese ist bei der
* berechnung des Wertes AUSGESCHLOSSEN.
*/
function zufallsZahlen(min, max)
{
	return parseInt((Math.random()*(max-min))+min);
}