function Befehlssatz(akku,speicher,befehlpointer,carryflag){
	this.akku = akku;
	this.speicher = speicher;
	this.befehlpointer = befehlpointer;
	this.carryflag = carryflag;
}


Befehlssatz.prototype.clr = function(reg){
	reg.clearReg();
};

Befehlssatz.prototype.add = function(reg){
	this.akku.setValue(reg.getDec() + this.akku.getDec());
};

Befehlssatz.prototype.addd = function(zahl){
	this.akku.setValue(zahl + this.akku.getDec());
};

Befehlssatz.prototype.inc = function(){
	this.akku.setValue(this.akku.getDec() + 1);
};

Befehlssatz.prototype.dec = function(){
	this.akku.setValue(this.akku.getDec() - 1);
};

Befehlssatz.prototype.lwdd = function(reg,speicheraddr){
	reg.setBinValue(this.speicher[speicheraddr] + this.speicher[speicheraddr+1]);
};

Befehlssatz.prototype.swdd = function(reg,speicheraddr){
	this.speicher[speicheraddr] = reg.getBin.slice(0,8);
	this.speicher[speicheraddr] = reg.getBin.slice(8,16);
};

Befehlssatz.prototype.swdd = function(reg,speicheraddr){
	this.speicher[speicheraddr] = reg.getBin.slice(0,8);
	this.speicher[speicheraddr] = reg.getBin.slice(8,16);
};

Befehlssatz.prototype.swdd = function(reg,speicheraddr){
	this.speicher[speicheraddr] = reg.getBin.slice(0,8);
	this.speicher[speicheraddr] = reg.getBin.slice(8,16);
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

	    };
	)
};

Befehlssatz.prototype.or = function(reg){
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
	    	if (akkuBool || regBool) {
	    		value = '1';
	    	}else{
	    		value = '0';
	    	};

	    };
	)
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
	    };
	)
};


Befehlssatz.prototype.bz = function(reg) {
	if (this.akku.getDec()==0) {
		this.befehlpointer = reg.getDec();
	};
};

Befehlssatz.prototype.bnz = function(reg) {
	if (this.akku.getDec()!=0) {
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
	};
};

Befehlssatz.prototype.bnzd = function(adr) {
	if (this.akku.getDec()!=0) {
		this.befehlpointer = adr.parseInt(binary, 2);
	};
};

Befehlssatz.prototype.bcd = function(adr) {
	if (this.carryflag == true) {
		this.befehlpointer = adr.parseInt(binary, 2);
	};
};

Befehlssatz.prototype.bd = function(adr) {
		this.befehlpointer = adr.parseInt(binary, 2);
};
