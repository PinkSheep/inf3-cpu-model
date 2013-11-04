window.onload = function() { 

	// inherit Zahl
	Register.prototype = new Zahl("0000000000000000");

	// correct the constructor pointer because it points to Zahl
	Register.prototype.constructor = Register;

	//Initialize all the nececary variables
	var akku = new Register("0000000000000000");
	var reg1 = new Register("0000000000000000");
	var reg2 = new Register("0000000000000000");
	var reg3 = new Register("0000000000000000");
	var speicherArr = [];
	var	opCodeArr = [];


	var carryflag = false;
	var befehlszaehler = 0;
	var befehlspointer = 100;

	var befehlssatz = new Befehlssatz(akku,speicherArr,befehlspointer,carryflag);

	refreshFrontend(akku,reg1,reg2,reg3,befehlspointer,befehlszaehler,speicherArr);

	// Eventhandling for op-code input
	$("#submitBefehle").click(function(){
		$("#befehlTabelle").empty();
		var tempArr = $("#befehle").val().split(/\n/);
		var opcodeIndex = 100;
		$.each(
		    tempArr,
		    function( index, value ){
		    	var binnaryString = parseOpcode(value);
		    	opCodeArr[opcodeIndex] = binnaryString.slice(0,8);
		    	opCodeArr[opcodeIndex + 1] = binnaryString.slice(8,16);
		    	opcodeIndex = opcodeIndex+2;
		    }
		);
		for(var index = 100; index < opCodeArr.length; index++){
			$("#befehlTabelle").append("<tr><td>"+index+"</td><td>"+opCodeArr[index]+"</td></tr>");
		}
	});

	//Eventhandling for Speicher Input
	$("#submitParameter").click(function(){
		$("#speicherTabelle").empty();
		var tempArr = $("#parameter").val().split(/\n/);
		var speicherIndex = 500;
		$.each(
		    tempArr,
		    function( index, value ){
		    	speicherArr[speicherIndex] = value.slice(0,8);
		    	speicherArr[speicherIndex + 1] = value.slice(8,16);
		    	speicherIndex = speicherIndex+2;
		    }
		);
		for(var index = 500; index < speicherArr.length; index++){
			$("#speicherTabelle").append("<tr><td>"+index+"</td><td>"+speicherArr[index]+"</td></tr>");
		}
	});

	//Step Modus
	$("#step").click(function(){
		var bitString = opCodeArr[befehlspointer]+opCodeArr[befehlspointer+1];
		switch (true) {
		case bitString.slice(0,4) == "0000" && bitString.slice(6,9) == "101":
	    	if (bitString.slice(4,6)=="00") {
	    		befehlssatz.clr(akku);
	    	}else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.clr(reg1);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.clr(reg2);
	    	}else{
	    		befehlssatz.clr(reg3);
	    	};
	    	break;
		 case bitString.slice(0,4) == "0000" && bitString.slice(6,9) == "111":
		    if (bitString.slice(4,6)=="00") {
	    		befehlssatz.add(akku);
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.add(reg1);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.add(reg2);
	    	}else{
	    		befehlssatz.add(reg3);
	    	};
		    break;
		 case bitString.slice(0,1) == "1":
		 	var zahl1 = new Zahl(bitString.slice(1,2) + bitString.slice(1,16));
		 	befehlssatz.addd(zahl1);
		    break;
		 case bitString.slice(0,8) == "00000001":
		 	befehlssatz.inc();
		    break;
		 case bitString.slice(0,8) == "00000100":
		 	befehlssatz.dec();
		    break;
		 case bitString.slice(0,3) == "010":
		 	if (bitString.slice(4,6)=="00") {
	    		befehlssatz.lwdd(akku,parseInt(bitString.slice(6,16),2));
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.lwdd(reg1,parseInt(bitString.slice(6,16),2));
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.lwdd(reg2,parseInt(bitString.slice(6,16),2));
	    	}else{
	    		befehlssatz.lwdd(reg3,parseInt(bitString.slice(6,16),2));
	    	};
		    break;
		 case bitString.slice(0,3) == "011":
		 	if (bitString.slice(4,6)=="00") {
	    		befehlssatz.lwdd(akku,parseInt(bitString.slice(6,16),2));
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.lwdd(reg1,parseInt(bitString.slice(6,16),2));
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.lwdd(reg2,parseInt(bitString.slice(6,16),2));
	    	}else{
	    		befehlssatz.lwdd(reg3,parseInt(bitString.slice(6,16),2));
	    	};
		    break;  		    
		 case bitString.slice(0,4) == "0000" && bitString.slice(6,9) == "100":
		 	if (bitString.slice(4,6)=="00") {
	    		befehlssatz.and(akku);
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.and(reg1);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.and(reg2);
	    	}else{
	    		befehlssatz.and(reg3);
	    	};
		    break;
		 case bitString.slice(0,4) == "0000" && bitString.slice(6,9) == "110":
		 	if (bitString.slice(4,6)=="00") {
	    		befehlssatz.or(akku);
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.or(reg1);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.or(reg2);
	    	}else{
	    		befehlssatz.or(reg3);
	    	};
		    break; 
		 case bitString.slice(0,4) == "0000" && bitString.slice(6,9) == "001":
		 	if (bitString.slice(4,6)=="00") {
	    		befehlssatz.not(akku);
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.not(reg1);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.not(reg2);
	    	}else{
	    		befehlssatz.not(reg3);
	    	};
		    break;
		 case bitString.slice(0,4) == "0001" && bitString.slice(6,8) == "10":
		 	if (bitString.slice(4,6)=="00") {
	    		befehlssatz.bz(akku);
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.bz(reg1);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.bz(reg2);
	    	}else{
	    		befehlssatz.bz(reg3);
	    	};
		    break;
		 case bitString.slice(0,4) == "0001" && bitString.slice(6,8) == "01":
		 	if (bitString.slice(4,6)=="00") {
	    		befehlssatz.bnz(akku);
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.bnz(reg1);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.bnz(reg2);
	    	}else{
	    		befehlssatz.bnz(reg3);
	    	};
		    break;
		 case bitString.slice(0,4) == "0001" && bitString.slice(6,8) == "11":
		 	if (bitString.slice(4,6)=="00") {
	    		befehlssatz.bc(akku);
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.bc(reg1);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.bc(reg2);
	    	}else{
	    		befehlssatz.bc(reg3);
	    	};
		    break;
		 case bitString.slice(0,4) == "0001" && bitString.slice(6,8) == "11":
		 	if (bitString.slice(4,6)=="00") {
	    		befehlssatz.b(akku);
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.b(reg1);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.b(reg2);
	    	}else{
	    		befehlssatz.b(reg3);
	    	};
		    break;
		 case bitString.slice(0,5) == "00110":
	    		befehlssatz.bzd(bitString.slice(6,16));
		    break;
		 case bitString.slice(0,5) == "00101":
	    		befehlssatz.bnzd(bitString.slice(6,16));
		    break;
		 case bitString.slice(0,5) == "00111":
	    		befehlssatz.bcd(bitString.slice(6,16));
		    break;
		 case bitString.slice(0,5) == "00100":
	    		befehlssatz.bd(bitString.slice(6,16));
		    break;			    		    
		  default:
		    befehlspointer=befehlspointer+2;
		    break;
		}
		refreshFrontend(akku,reg1,reg2,reg3,befehlspointer,befehlszaehler);

	});	



}

function refreshFrontend(akku,reg1,reg2,reg3,befehlspointer,befehlszaehler,speicherArr){
	$("#akku").append("<p>"+akku.getDec()+"</p><p>"+akku.getBin()+"</p>");
	$("#reg1").append("<p>"+reg1.getDec()+"</p><p>"+reg1.getBin()+"</p>");
	$("#reg2").append("<p>"+reg2.getDec()+"</p><p>"+reg2.getBin()+"</p>");
	$("#reg3").append("<p>"+reg3.getDec()+"</p><p>"+reg3.getBin()+"</p>");
	$("#befehlspointer").append("<p>"+befehlspointer+"</p>");
	$("#befehlsanzahl").append("<p>"+befehlszaehler+"</p>");

	$("#speicherTabelle").empty();
	for(var index = 500; index < speicherArr.length; index++){
		$("#speicherTabelle").append("<tr><td>"+index+"</td><td>"+speicherArr[index]+"</td></tr>");
	}
}

function parseOpcode(mnemonic){
	switch(true){
		case mnemonic.indexOf("CLR") !== -1:
			return "0000"+parseInt(mnemonic.slice(4,6),10).toString(2)+"101000000";
			break;
		case mnemonic.slice(0,4) == "ADD ":
			return "0000"+parseInt(mnemonic.slice(4,6),10).toString(2)+"111000000";
			break;
		case mnemonic.slice(0,4) == "ADDD":
			var binary = parseInt(mnemonic.slice(5,mnemonic.length),10)
			var zahl1 = new Zahl("0000000000000000");
			zahl1.setValue(parseInt(mnemonic.slice(5,mnemonic.length),10));
			if (zahl1.getDec() < -16384 || zahl1.getDec() > 16383) {
				alert("Parameter Zahl von ADDD gross oder klein für 15bit");
			}else{
				return "1"+zahl1.getBin().slice(1,16);
			};
			break;
		case mnemonic.indexOf("INC") !== -1:
			return "0000000100000000";
			break;	
		case mnemonic.indexOf("DEC") !== -1:
			return "0000010000000000";
			break;	
		case mnemonic.indexOf("LWDD") !== -1:
			return "0100"+parseInt(mnemonic.slice(5,7),10).toString(2)+parseInt(mnemonic.slice(8,mnemonic.length),10).toString(2);
			break;	
		case mnemonic.indexOf("SWDD") !== -1:
			return "0110"+parseInt(mnemonic.slice(5,7),10).toString(2)+parseInt(mnemonic.slice(8,mnemonic.length),10).toString(2);
			break;
		case mnemonic.indexOf("AND") !== -1:
			return "0000"+parseInt(mnemonic.slice(4,6),10).toString(2)+"1000000000";
			break;
		case mnemonic.indexOf("OR") !== -1:
			return "0000"+parseInt(mnemonic.slice(3,5),10).toString(2)+"1100000000";
			break;
		case mnemonic.indexOf("NOT") !== -1:
			return "0000000010000000";
			break;
		case mnemonic.indexOf("BZ ") !== -1:
			return "0001"+parseInt(mnemonic.slice(3,5),10).toString(2)+"1000000000";
			break;
		case mnemonic.indexOf("BNZ ") !== -1:
			return "0001"+parseInt(mnemonic.slice(4,6),10).toString(2)+"0100000000";
			break;
		case mnemonic.indexOf("BC ") !== -1:
			return "0001"+parseInt(mnemonic.slice(3,5),10).toString(2)+"1100000000";
			break;	
		case mnemonic.indexOf("B ") !== -1:
			return "0001"+parseInt(mnemonic.slice(2,4),10).toString(2)+"0000000000";
			break;
		case mnemonic.indexOf("BZD") !== -1:
			return "0011100"+parseInt(mnemonic.slice(4,mnemonic.length),10).toString(2)+"0000000000";
			break;																																			
	}
}

function speicherAktualisieren(speicher){

}
