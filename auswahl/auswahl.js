$(function(){

var counterBallon = 0;
var counterEnte = 0;
var counterDose = 0;

	$("#dose").css({"cursor":"pointer"}).hover(function(){
		if(counterDose<=1){
			opacity:0.1;
			
		}else
		{
			$("#dose").click(function(){
				location.href="../Startseite/Startseite.html";//hier relativ adressierung zu dem entsprechenden Stand
			});
			counterDose++;
		}
		
		//hier kommt das yellowshining gedöns hin !
	});
	
	$("#ente").css({"cursor":"pointer"}).hover(function(){
		if(counterEnte<=1){
			opacity:0.1;
			
		}else
		{
			
			$("#ente").click(function(){
				location.href="../Startseite/Startseite.html";//hier relativ adressierung zu dem entsprechenden Stand
			});
			counterEnte++;
		}
		
		//hier kommt das yellowshining gedöns hin !
	});
	
	$("#ballon").css({"cursor":"pointer"}).hover(function(){
		if(counterBallon<=1){
			opacity:0.1;
			
		}else
		{
			$("#ballon").css({"cursor":"pointer"}).click(function(){
				location.href="../Startseite/Startseite.html";//hier relativ adressierung zu dem entsprechenden Stand
			});
		counterBallon++;
		}
		
		//hier kommt das yellowshining gedöns hin !
	});
	

	
});