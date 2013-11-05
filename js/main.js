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
	var befehlszaehler = new Zahl("0000000000000000");
	var tempint = 100;
	var befehlpointer = new Zahl("0000000001100100");

	var befehlssatz = new Befehlssatz(akku,speicherArr,befehlpointer,carryflag);

	refreshFrontend(akku,reg1,reg2,reg3,befehlpointer,befehlszaehler,speicherArr,carryflag);

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
		for(var index = 500; index < speicherArr.length; index+=2){var indexplus = index +1;
			if (speicherArr[index].length<8) {
				var zahl = new Zahl("0000000000000000");
			}else{
				var zahl = new Zahl(speicherArr[index]+speicherArr[indexplus]);
			};
			$("#speicherTabelle").append("<tr><td>"+index+"+"+indexplus+"</td><td>"+zahl.getDec()+"</td><td>"+speicherArr[index]+speicherArr[indexplus]+"</td></tr>");
		}
	});
	// Reset Button
	$("#reset").click(function(){
		akku.setValue(0);
		reg1.setValue(0);
		reg2.setValue(0);
		reg3.setValue(0);
		befehlszaehler.setValue(0);
		befehlpointer.setValue(100);
		carryflag = false;
		speicherArr = [];
		opCodeArr = [];
		$("#befehlTabelle").empty();
		refreshFrontend(akku,reg1,reg2,reg3,befehlpointer,befehlszaehler,speicherArr,carryflag);

	});

	//Run Modus
	$("#run").click(function(){
		while(befehlpointer.getDec()<opCodeArr.length){
		var bitString = opCodeArr[befehlpointer.getDec()]+opCodeArr[befehlpointer.getDec()+1];
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
	    		carryflag = befehlssatz.add(akku,carryflag);
	    	} else if (bitString.slice(4,6)=="01") {
	    		carryflag = befehlssatz.add(reg1,carryflag);
	    	}else if (bitString.slice(4,6)=="10") {
	    		carryflag = befehlssatz.add(reg2,carryflag);
	    	}else{
	    		carryflag = befehlssatz.add(reg3,carryflag);
	    	};
		    break;
		 case bitString.slice(0,1) == "1":
		 	var zahl1 = new Zahl(bitString.slice(1,2) + bitString.slice(1,16));
		 	carryflag = befehlssatz.addd(zahl1,carryflag);
		    break;
		 case bitString.slice(0,8) == "00000001":
		 	carryflag = befehlssatz.inc(carryflag);
		    break;
		 case bitString.slice(0,8) == "00000100":
		 	carryflag = befehlssatz.dec(carryflag);
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
	    		befehlssatz.swdd(akku,parseInt(bitString.slice(6,16),2));
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.swdd(reg1,parseInt(bitString.slice(6,16),2));
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.swdd(reg2,parseInt(bitString.slice(6,16),2));
	    	}else{
	    		befehlssatz.swdd(reg3,parseInt(bitString.slice(6,16),2));
	    	};
		    break;
		 case bitString.slice(0,8) == "00001100":
		 	carryflag = befehlssatz.sll(); 
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
	    		befehlssatz.bc(akku,carryflag);
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.bc(reg1,carryflag);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.bc(reg2,carryflag);
	    	}else{
	    		befehlssatz.bc(reg3,carryflag);
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
	    		befehlssatz.bcd(bitString.slice(6,16),carryflag);
		    break;
		 case bitString.slice(0,5) == "00100":
	    		befehlssatz.bd(bitString.slice(6,16));
		    break;			    		    
		  default:
		  	befehlssatz.end();
		    befehlpointer.setValue(befehlpointer.getDec() + 2);
		    break;
		}
		befehlszaehler.setValue(befehlszaehler.getDec() + 1);
	}
	refreshFrontend(akku,reg1,reg2,reg3,befehlpointer,befehlszaehler,speicherArr,carryflag);


	});	

	//Step Modus
	$("#step").click(function(){
		var bitString = opCodeArr[befehlpointer.getDec()]+opCodeArr[befehlpointer.getDec()+1];
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
	    		carryflag = befehlssatz.add(akku,carryflag);
	    	} else if (bitString.slice(4,6)=="01") {
	    		carryflag = befehlssatz.add(reg1,carryflag);
	    	}else if (bitString.slice(4,6)=="10") {
	    		carryflag = befehlssatz.add(reg2,carryflag);
	    	}else{
	    		carryflag = befehlssatz.add(reg3,carryflag);
	    	};
		    break;
		 case bitString.slice(0,1) == "1":
		 	var zahl1 = new Zahl(bitString.slice(1,2) + bitString.slice(1,16));
		 	carryflag = befehlssatz.addd(zahl1,carryflag);
		    break;
		 case bitString.slice(0,8) == "00000001":
		 	carryflag = befehlssatz.inc(carryflag);
		    break;
		 case bitString.slice(0,8) == "00000100":
		 	carryflag = befehlssatz.dec(carryflag);
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
	    		befehlssatz.swdd(akku,parseInt(bitString.slice(6,16),2));
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.swdd(reg1,parseInt(bitString.slice(6,16),2));
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.swdd(reg2,parseInt(bitString.slice(6,16),2));
	    	}else{
	    		befehlssatz.swdd(reg3,parseInt(bitString.slice(6,16),2));
	    	};
		    break;
		 case bitString.slice(0,8) == "00001100":
		 	carryflag = befehlssatz.sll(); 
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
	    		befehlssatz.bc(akku,carryflag);
	    	} else if (bitString.slice(4,6)=="01") {
	    		befehlssatz.bc(reg1,carryflag);
	    	}else if (bitString.slice(4,6)=="10") {
	    		befehlssatz.bc(reg2,carryflag);
	    	}else{
	    		befehlssatz.bc(reg3,carryflag);
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
	    		befehlssatz.bcd(bitString.slice(6,16),carryflag);
		    break;
		 case bitString.slice(0,5) == "00100":
	    		befehlssatz.bd(bitString.slice(6,16));
		    break;			    		    
		  default:
		  	befehlssatz.end();
		    befehlpointer.setValue(befehlpointer.getDec() + 2);
		    break;
		}
		befehlszaehler.setValue(befehlszaehler.getDec() + 1);
		refreshFrontend(akku,reg1,reg2,reg3,befehlpointer,befehlszaehler,speicherArr,carryflag);

	});	



}

function refreshFrontend(akku,reg1,reg2,reg3,befehlpointer,befehlszaehler,speicherArr,carryflag){
	$(".insert-data").remove();
	$("#akku").append("<p class=\"insert-data\">"+akku.getDec()+"</p><p class=\"insert-data\">"+akku.getBin()+"</p>");
	$("#reg1").append("<p class=\"insert-data\">"+reg1.getDec()+"</p><p class=\"insert-data\">"+reg1.getBin()+"</p>");
	$("#reg2").append("<p class=\"insert-data\">"+reg2.getDec()+"</p><p class=\"insert-data\">"+reg2.getBin()+"</p>");
	$("#reg3").append("<p class=\"insert-data\">"+reg3.getDec()+"</p><p class=\"insert-data\">"+reg3.getBin()+"</p>");
	$("#befehlpointer").append("<p class=\"insert-data\">"+befehlpointer.getDec()+"</p class=\"insert-data\">");
	$("#befehlsanzahl").append("<p class=\"insert-data\">"+befehlszaehler.getDec()+"</p class=\"insert-data\">");
	$("#carryflag").append("<p class=\"insert-data\">"+carryflag+"</p class=\"insert-data\">");
	$("#speicherTabelle").empty();
	for(var index = 500; index < speicherArr.length; index+=2){
			var indexplus = index +1;
			if (speicherArr[index].length<8) {
				var zahl = new Zahl("0000000000000000");
			}else{
				var zahl = new Zahl(speicherArr[index]+speicherArr[indexplus]);
			};
			$("#speicherTabelle").append("<tr><td>"+index+"+"+indexplus+"</td><td>"+zahl.getDec()+"</td><td>"+speicherArr[index]+speicherArr[indexplus]+"</td></tr>");
	}
}

function parseOpcode(mnemonic){
	switch(true){
		case mnemonic.indexOf("CLR") !== -1:
			var str = "";
			if (parseInt(mnemonic.slice(5,6),10)<2) {
				str = "0";
			};
			str += parseInt(mnemonic.slice(5,6),10).toString(2);
			return "0000"+str+"1010000000";
			break;
		case mnemonic.slice(0,4) == "ADD ":
			var str = "";
			if (parseInt(mnemonic.slice(5,6),10)<2) {
				str = "0";
			};
			str += parseInt(mnemonic.slice(5,6),10).toString(2);
			return "0000"+str+"1110000000";
			break;
		case mnemonic.slice(0,4) == "ADDD":
			var binary = parseInt(mnemonic.slice(6,mnemonic.length),10);
			var zahl1 = new Zahl("0000000000000000");
			zahl1.setValue(parseInt(mnemonic.slice(6,mnemonic.length),10));
			var min = -16384;
			if (zahl1.getDec() < min || zahl1.getDec() > 16383) {
				alert("Parameter Zahl von ADDD zu gross oder klein für 15bit");
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
			var str = "";
			if (parseInt(mnemonic.slice(6,7),10)<2) {
				str = "0";
			};
			str += parseInt(mnemonic.slice(6,7),10).toString(2);
			var binary = "0000000000";
			var arr = mnemonic.split("#");
			var binaryNullstr = binary.slice(0,binary.length-parseInt(arr[1],10).toString(2).length);
			return "0100"+str+binaryNullstr+parseInt(arr[1],10).toString(2);
			break;	
		case mnemonic.indexOf("SWDD") !== -1:
			var str = "";
			if (parseInt(mnemonic.slice(6,7),10)<2) {
				str = "0";
			};
			str += parseInt(mnemonic.slice(6,7),10).toString(2);
			var binary = "0000000000";
			var arr = mnemonic.split("#");
			var binaryNullstr = binary.slice(0,binary.length-parseInt(arr[1],10).toString(2).length);
			return "0110"+str+binaryNullstr+parseInt(arr[1],10).toString(2);
			break;
		case mnemonic.indexOf("SLL") !== -1:
			return "0000110000000000";
			break;
		case mnemonic.indexOf("AND") !== -1:
			var str = "";
			if (parseInt(mnemonic.slice(5,6),10)<2) {
				str = "0";
			};
			str += parseInt(mnemonic.slice(6,7),10).toString(2);
			return "0000"+str+"1000000000";
			break;
		case mnemonic.indexOf("OR") !== -1:
			var str = "";
			if (parseInt(mnemonic.slice(5,6),10)<2) {
				str = "0";
			};
			str += parseInt(mnemonic.slice(6,7),10).toString(2);
			return "0000"+str+"1100000000";
			break;
		case mnemonic.indexOf("NOT") !== -1:
			return "0000000010000000";
			break;
		case mnemonic.indexOf("BZ ") !== -1:
		var str = "";
			if (parseInt(mnemonic.slice(4,5),10)<2) {
				str = "0";
			};
			str += parseInt(mnemonic.slice(4,5),10).toString(2);
			return "0001"+str+"1000000000";
			break;
		case mnemonic.indexOf("BNZ ") !== -1:
			var str = "";
			if (parseInt(mnemonic.slice(5,6),10)<2) {
				str = "0";
			};
			str += parseInt(mnemonic.slice(6,7),10).toString(2);
			return "0001"+str+"0100000000";
			break;
		case mnemonic.indexOf("BC ") !== -1:
			var str = "";
			if (parseInt(mnemonic.slice(4,5),10)<2) {
				str = "0";
			};
			str += parseInt(mnemonic.slice(4,5),10).toString(2);
			return "0001"+str+"1100000000";
			break;	
		case mnemonic.indexOf("B ") !== -1:
			var str = "";
			if (parseInt(mnemonic.slice(3,4),10)<2) {
				str = "0";
			};
			str += parseInt(mnemonic.slice(3,4),10).toString(2);
			return "0001"+str+"0000000000";
			break;
		case mnemonic.indexOf("BZD") !== -1:
			var binary = "0000000000";
			var arr = mnemonic.split("#");
			var binaryNullstr = binary.slice(0,binary.length-parseInt(arr[1],10).toString(2).length);
			return "001100"+binaryNullstr+parseInt(arr[1],10).toString(2);
			break;
		case mnemonic.indexOf("BNZD") !== -1:
			var binary = "0000000000";
			var arr = mnemonic.split("#");
			var binaryNullstr = binary.slice(0,binary.length-parseInt(arr[1],10).toString(2).length);
			return "001010"+binaryNullstr+parseInt(arr[1],10).toString(2);
			break;																					
		case mnemonic.indexOf("BCD") !== -1:
			var binary = "0000000000";
			var arr = mnemonic.split("#");
			var binaryNullstr = binary.slice(0,binary.length-parseInt(arr[1],10).toString(2).length);
			return "001110"+binaryNullstr+parseInt(arr[1],10).toString(2);
			break;
		case mnemonic.indexOf("BD") !== -1:
			var binary = "0000000000";
			var arr = mnemonic.split("#");
			var binaryNullstr = binary.slice(0,binary.length-parseInt(arr[1],10).toString(2).length);
			return "001000"+binaryNullstr+parseInt(arr[1],10).toString(2);
			break;
		default:
			return "0000000000000000";					
	}
}

function speicherAktualisieren(speicher){

}
