window.onload = function() { 
	$("#submitBefehle").click(function(){
		var tempArr = $("#befehle").val().split(/\n/);
		speicherArr = [];
		$.each(
		    tempArr,
		    function( index, value ){
		    	speicherArr[index+100] = value.slice(0,8);
		    	speicherArr[index+101] = value.slice(8,16);
		    }
		);
		for(var index = 100; index < speicherArr.length -1; index++){
			$("#befehlTabelle").append("<tr><td>"+index+"</td><td>"+speicherArr[index]+"</td></tr>");
		}
	});

}

function speicherAktualisieren(speicher){

}
