function Befehlssatz(akku,speicher,befehlpointer,carryflag){
	this.akku = akku;
	this.speicher = speicher;
	this.befehlpointer = befehlpointer;
	this.carryflag = carryflag;
}

Befehlssatz.prototype.setValues = function(akku,speicher,befehlpointer,carryflag){
	this.akku = akku;
	this.speicher = speicher;
	this.befehlpointer = befehlpointer;
	this.carryflag = carryflag;
};


Befehlssatz.prototype.clr = function(reg){
	reg.clearReg();
	this.carryflag = false;
	this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
};

Befehlssatz.prototype.add = function(reg){
	var arrReg = reg.getBin().split('');
	var arrAkku = this.akku.getBin().split('');

	var arrResult = [];

	var ueberlauf = false;

	for (var i = arrReg.length - 1; i >= 0; i--) {
		switch(true){
		case !ueberlauf && arrReg[i]=="1" && arrAkku[i] =="1":
			arrResult[i] = "0";
			ueberlauf = true;
			break;
		case ueberlauf && arrReg[i]=="1" && arrAkku[i] =="1":
			arrResult[i] = "1";
			ueberlauf = true;
			break;
		case !ueberlauf && arrReg[i]=="0" && arrAkku[i] =="1":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		case ueberlauf && arrReg[i]=="0" && arrAkku[i] =="1":
			arrResult[i] = "0";
			ueberlauf = true;
			break;
		case !ueberlauf && arrReg[i]=="1" && arrAkku[i] =="0":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		case ueberlauf && arrReg[i]=="1" && arrAkku[i] =="0":
			arrResult[i] = "0";
			ueberlauf = true;
			break;
		case !ueberlauf && arrReg[i]=="0" && arrAkku[i] =="0":
			arrResult[i] = "0";
			ueberlauf = false;
			break;
		case ueberlauf && arrReg[i]=="1" && arrAkku[i] =="1":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		default:
			alert("something went wrong");
			break;
			}						
		}
		this.akku.setBinValue(arrResult.join(''));
		return ueberlauf;
	};

Befehlssatz.prototype.addd = function(zahl){
	var arrReg = zahl.getBin().split('');
	var arrAkku = this.akku.getBin().split('');

	var arrResult = [];

	var ueberlauf = false;

	for (var i = arrReg.length - 1; i >= 0; i--) {
		switch(true){
		case !ueberlauf && arrReg[i]=="1" && arrAkku[i] =="1":
			arrResult[i] = "0";
			ueberlauf = true;
			break;
		case ueberlauf && arrReg[i]=="1" && arrAkku[i] =="1":
			arrResult[i] = "1";
			ueberlauf = true;
			break;
		case !ueberlauf && arrReg[i]=="0" && arrAkku[i] =="1":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		case ueberlauf && arrReg[i]=="0" && arrAkku[i] =="1":
			arrResult[i] = "0";
			ueberlauf = true;
			break;
		case !ueberlauf && arrReg[i]=="1" && arrAkku[i] =="0":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		case ueberlauf && arrReg[i]=="1" && arrAkku[i] =="0":
			arrResult[i] = "0";
			ueberlauf = true;
			break;
		case !ueberlauf && arrReg[i]=="0" && arrAkku[i] =="0":
			arrResult[i] = "0";
			ueberlauf = false;
			break;
		case ueberlauf && arrReg[i]=="1" && arrAkku[i] =="1":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		default:
			alert("something went wrong");
			break;
			}						
		}
		this.akku.setBinValue(arrResult.join(''));
		return ueberlauf;
};

Befehlssatz.prototype.inc = function(){
	var arrReg = 
	var arrAkku = this.akku.getBin().split('');

	var arrResult = [];

	var ueberlauf = false;

	for (var i = arrReg.length - 1; i >= 0; i--) {
		switch(true){
		case !ueberlauf && arrReg[i]=="1" && arrAkku[i] =="1":
			arrResult[i] = "0";
			ueberlauf = true;
			break;
		case ueberlauf && arrReg[i]=="1" && arrAkku[i] =="1":
			arrResult[i] = "1";
			ueberlauf = true;
			break;
		case !ueberlauf && arrReg[i]=="0" && arrAkku[i] =="1":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		case ueberlauf && arrReg[i]=="0" && arrAkku[i] =="1":
			arrResult[i] = "0";
			ueberlauf = true;
			break;
		case !ueberlauf && arrReg[i]=="1" && arrAkku[i] =="0":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		case ueberlauf && arrReg[i]=="1" && arrAkku[i] =="0":
			arrResult[i] = "0";
			ueberlauf = true;
			break;
		case !ueberlauf && arrReg[i]=="0" && arrAkku[i] =="0":
			arrResult[i] = "0";
			ueberlauf = false;
			break;
		case ueberlauf && arrReg[i]=="1" && arrAkku[i] =="1":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		default:
			alert("something went wrong");
			break;
			}						
		}
		this.akku.setBinValue(arrResult.join(''));
		return ueberlauf;

};

Befehlssatz.prototype.dec = function(carryflag){
	var tempInt = this.akku.getDec() - 1;
	var min = -32768;
	if (tempInt < min) {
		this.akku.setValue(65536+this.akku.getDec());
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
		return true;
	}else if (tempInt > 32767) {
		this.akku.setValue(this.akku.getDec()-65536);
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
		return true;
	}else{
		this.akku.setValue(tempInt);
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
		return false;
	};
};

Befehlssatz.prototype.lwdd = function(reg,speicheraddr){
	reg.setBinValue(this.speicher[speicheraddr] + this.speicher[speicheraddr+1]);
	this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
};

Befehlssatz.prototype.swdd = function(reg,speicheraddr){
	this.speicher[speicheraddr] = reg.getBin().slice(0,8);
	this.speicher[speicheraddr+1] = reg.getBin().slice(8,16);
	this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
};

Befehlssatz.prototype.and = function(reg){
	//akku in binary
	var akkuArr = this.akku.getBin().split('');
	//  binary value in register
	var regArr = reg.getBin().split('');
	// compare akku and registry and do a logical and between the two
	$.each(
	    akkuArr,
	    function( index, value ){
	    	var akkuBool = value=='1'?true:false;
	    	var regBool = regArr[index]=='1'?true:false;
	    	if (akkuBool && regBool) {
	    		value = '1';
	    	}else{
	    		value = '0';
	    	};
	    }
	);

	this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
};

Befehlssatz.prototype.or = function(reg){
	//akku in binary
	var akkuArr = this.akku.getBin().split('');
	//  binary value in register
	var regArr = reg.getBin().split('');
	// compare akku and registry and do a logical or between the two
	$.each(
	    akkuArr,
	    function( index, value ){
	    	var akkuBool = value=='1'?true:false;
	    	var regBool = regArr[index]=='1'?true:false;
	    	if (akkuBool || regBool) {
	    		value = '1';
	    	}else{
	    		value = '0';
	    	};

	    }
	);

	this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
};

Befehlssatz.prototype.not = function() {
		
	var arr = this.akku.getBin().split('');
	$.each(
	    arr,
	    function( intIndex, objValue ){
	  			if (objValue == "0"){
	  				objValue = "1";
	  			} else {
	  				objValue = "0";
	  			}
	    }
	);

	this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
};


Befehlssatz.prototype.bz = function(reg) {
	if (this.akku.getDec()==0) {
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.bnz = function(reg) {
	if (this.akku.getDec()!==0) {
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.bc = function(reg) {
	if (this.carryflag == true) {
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.b = function(reg) {
	this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
};

Befehlssatz.prototype.bzd = function(adr) {
	if (this.akku.getDec()==0) {
		this.befehlpointer = adr.parseInt(binary, 2);
	} else{
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.bnzd = function(adr) {
	if (this.akku.getDec()!==0) {
		this.befehlpointer = adr.parseInt(binary, 2);
	} else{
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.bcd = function(adr) {
	if (this.carryflag == true) {
		this.befehlpointer = adr.parseInt(binary, 2);
	} else{
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.bd = function(adr) {
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
};
