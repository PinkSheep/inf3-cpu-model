function Befehlssatz(akku,speicher,befehlpointer,carryflag){
	this.akku = akku;
	this.speicher = speicher;
	this.befehlpointer = befehlpointer;
	this.carryflag = carryflag;
}

Befehlssatz.prototype.zweierkomp(zahl){
	// konvertiert eine beliebige zahl zwischen 32767 und -32768 ins Zweierkomplement (16-bit Darstellung)
	var zeroes = '0000000000000000';
	if (zahl < 0) {
		// falls zu suchende binärzahl negativ
		zahl = zahl * (-1);
		var tempStr = zahl.toString(2);
		var zweierPos = zeroes.slice(0,16-tempStr.length).concat(tempStr);
		var zweierArr = zweierPos.split('');
		// kehre jedes bit um
		$.each(
		    zweierArr,
		    function( intIndex, objValue ){
		  			if (objValue == "0"){
		  				objValue = "1";
		  			} else {
		  				objValue = "0";
		  			}
		    };
		)
		//addiere plus eins im binärsystem
		for (var i = zweierArr.length-1; i >= 0; i--){
			if (zweierArr[i] == "1") {
				zweierArr[i] = "0";
			}else{
				zweierArr[i] = "1";
				return zweierArr.join('');
			};
		}
		return false;


	} else {
		// falls zu suchende binärzahl positiv oder 0
		var tempStr = zahl.toString(2);
		return zeroes.slice(0,16-tempStr.length).concat(tempStr);	
	};
};

Befehlssatz.prototype.clr(reg){
	reg.clearReg();
};

Befehlssatz.prototype.add = function(reg){
	this.akku.setValue(zweierkomp(reg.getDec() + this.akku.getDec()));
};

Befehlssatz.prototype.addd = function(zahl){
	this.akku.setValue(zweierkomp(zahl + this.akku.getDec()));
};

Befehlssatz.prototype.inc = function(){
	this.akku.setValue(zweierkomp(this.akku.getDec() + 1));
};

Befehlssatz.prototype.dec = function(){
	this.akku.setValue(zweierkomp(this.akku.getDec() - 1));
};

Befehlssatz.prototype.lwdd = function(reg,speicheraddr){
	reg.setValue(this.speicher[speicheraddr] + this.speicher[speicheraddr+1]);
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
