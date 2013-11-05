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
	var strReg = reg.getBin().slice(0,1) + reg.getBin();
	var arrReg = strReg.split('');
	var strAkku = this.akku.getBin().slice(0,1)+this.akku.getBin();
	var arrAkku = strAkku.split('');

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
		case ueberlauf && arrReg[i]=="0" && arrAkku[i] =="0":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		default:
			alert("something went wrong");
			break;
			}						
		}
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
		this.akku.setBinValue(arrResult.join('').slice(1,17));
		if(arrResult[0]==arrResult[1]){	
			return false;
		};
		return true;
	};

Befehlssatz.prototype.addd = function(zahl){
	var strReg = zahl.getBin().slice(0,1) + zahl.getBin();
	var arrReg = strReg.split('');
	var strAkku = this.akku.getBin().slice(0,1)+this.akku.getBin();
	var arrAkku = strAkku.split('');

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
		case ueberlauf && arrReg[i]=="0" && arrAkku[i] =="0":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		default:
			alert("something went wrong");
			break;
			}						
		}
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
		this.akku.setBinValue(arrResult.join('').slice(1,17));
		if(arrResult[0]==arrResult[1]){	
			return false;
		};
		return true;
	};

Befehlssatz.prototype.inc = function(){
	var oneStr = "00000000000000001";
	var arrReg = oneStr.split('');
	var strAkku = this.akku.getBin().slice(0,1)+this.akku.getBin();
	var arrAkku = strAkku.split('');

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
		case ueberlauf && arrReg[i]=="0" && arrAkku[i] =="0":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		default:
			alert("something went wrong");
			break;
			}						
		}
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
		this.akku.setBinValue(arrResult.join('').slice(1,17));
		if(arrResult[0]==arrResult[1]){	
			return false;
		};
		return true;
};

Befehlssatz.prototype.dec = function(){
	var oneStr = "11111111111111111";
	var arrReg = oneStr.split('');
	var strAkku = this.akku.getBin().slice(0,1)+this.akku.getBin();
	var arrAkku = strAkku.split('');

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
		case ueberlauf && arrReg[i]=="0" && arrAkku[i] =="0":
			arrResult[i] = "1";
			ueberlauf = false;
			break;
		default:
			alert("something went wrong");
			break;
			}						
		}
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
		this.akku.setBinValue(arrResult.join('').slice(1,17));
		if(arrResult[0]==arrResult[1]){	
			return false;
		};
		return true;
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

Befehlssatz.prototype.sll = function(){
	var strAkku = this.akku.getBin();
	var arrAkku = strAkku.split('');
	arrAkku[16] = "0";
	this.akku.setBinValue(arrAkku.slice(1,17).join(''));
	this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	if (arrAkku[0]=="0") {
		return false;
	};
	return true;
}

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
	    		akkuArr[index] = '1';
	    	}else{
	    		akkuArr[index] = '0';
	    	};
	    }
	);
	this.akku.setBinValue(akkuArr.join(''));

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
	    		akkuArr[index] = '1';
	    	}else{
	    		akkuArr[index] = '0';
	    	};

	    }
	);

	thid.akku.setBinValue(akkuArr.join(''));

	this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
};

Befehlssatz.prototype.not = function() {
		
	var arr = this.akku.getBin().split('');
	$.each(
	    arr,
	    function( intIndex, objValue ){
	  			if (objValue == "0"){
	  				arr[intIndex] = "1";
	  			} else {
	  				arr[intIndex] = "0";
	  			}
	    }
	);
	this.akku.setBinValue(arr.join(''));

	this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
};


Befehlssatz.prototype.bz = function(reg) {
	if (this.akku.getDec()==0) {
		this.befehlpointer.setValue(reg.getDec());
	}else{
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.bnz = function(reg) {
	if (this.akku.getDec()!==0) {
		this.befehlpointer.setValue(reg.getDec());
	}else{
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.bc = function(reg,carryflag) {
	if (carryflag) {
		this.befehlpointer.setValue(reg.getDec());
	}else{
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.b = function(reg) {
	this.befehlpointer.setValue(reg.getDec());
};

Befehlssatz.prototype.bzd = function(adr) {
	if (this.akku.getDec()==0) {
		this.befehlpointer.setValue(parseInt(adr, 2));
	} else{
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.bnzd = function(adr) {
	if (this.akku.getDec()!==0) {
		this.befehlpointer.setValue(parseInt(adr, 2));
	} else{
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.bcd = function(adr,carryflag) {
	if (carryflag) {
		this.befehlpointer.setValue(parseInt(adr, 2));
	} else{
		this.befehlpointer.setValue(this.befehlpointer.getDec()+2);
	};
};

Befehlssatz.prototype.bd = function(adr) {
		this.befehlpointer.setValue(parseInt(adr, 2));
};

Befehlssatz.prototype.end = function() {
};