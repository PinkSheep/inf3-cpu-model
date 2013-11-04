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
	this.befehlpointer = this.befehlpointer + 2;
};

Befehlssatz.prototype.add = function(reg){
	var tempInt = reg.getDec() + this.akku.getDec();
	if (tempInt < −32768 || tempInt > 32767) {
		this.carryflag = true;
	}else{
		this.akku.setValue(tempInt);
	};
	this.befehlpointer += 2;
};

Befehlssatz.prototype.addd = function(zahl){
	var tempInt = zahl.getDec() + this.akku.getDec();
	if (tempInt < −32768 || tempInt > 32767) {
		this.carryflag = true;
	}else{
		this.akku.setValue(tempInt);
	};
	this.befehlpointer = this.befehlpointer + 2;
};

Befehlssatz.prototype.inc = function(){
	var this.akku.getDec() + 1;
	if (tempInt > 32767) {
		this.carryflag = true;
	}else{
		this.akku.setValue(tempInt);
	};
	this.befehlpointer = this.befehlpointer + 2;
};

Befehlssatz.prototype.dec = function(){
	var this.akku.getDec() + 1;
	if (tempInt > 32767) {
		this.carryflag = true;
	}else{
		this.akku.setValue(tempInt);
	};
	this.akku.setValue(this.akku.getDec() - 1);
	this.befehlpointer = this.befehlpointer + 2;
};

Befehlssatz.prototype.lwdd = function(reg,speicheraddr){
	reg.setBinValue(this.speicher[speicheraddr] + this.speicher[speicheraddr+1]);
	this.befehlpointer = this.befehlpointer + 2;
};

Befehlssatz.prototype.swdd = function(reg,speicheraddr){
	this.speicher[speicheraddr] = reg.getBin.slice(0,8);
	this.speicher[speicheraddr] = reg.getBin.slice(8,16);
	this.befehlpointer = this.befehlpointer + 2;
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

	this.befehlpointer = this.befehlpointer + 2;
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

	this.befehlpointer = this.befehlpointer + 2;
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

	this.befehlpointer = this.befehlpointer + 2;
};


Befehlssatz.prototype.bz = function(reg) {
	if (this.akku.getDec()==0) {
		this.befehlpointer = reg.getDec();
	};
};

Befehlssatz.prototype.bnz = function(reg) {
	if (this.akku.getDec()!==0) {
		this.befehlpointer = reg.getDec();
	};
};

Befehlssatz.prototype.bc = function(reg) {
	if (this.carryflag == true) {
		this.befehlpointer = reg.getDec();
	};
};

Befehlssatz.prototype.b = function(reg) {
	this.befehlpointer = reg.getDec();
};

Befehlssatz.prototype.bzd = function(adr) {
	if (this.akku.getDec()==0) {
		this.befehlpointer = adr.parseInt(binary, 2);
	} else{
		this.befehlpointer = this.befehlpointer + 2;
	};
};

Befehlssatz.prototype.bnzd = function(adr) {
	if (this.akku.getDec()!==0) {
		this.befehlpointer = adr.parseInt(binary, 2);
	} else{
		this.befehlpointer = this.befehlpointer + 2;
	};
};

Befehlssatz.prototype.bcd = function(adr) {
	if (this.carryflag == true) {
		this.befehlpointer = adr.parseInt(binary, 2);
	} else{
		this.befehlpointer = this.befehlpointer + 2;
	};
};

Befehlssatz.prototype.bd = function(adr) {
		this.befehlpointer = adr.parseInt(binary, 2);
};
