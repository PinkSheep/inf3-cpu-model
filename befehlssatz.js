function Befehlssatz(akku,reg1,reg2,reg3,speicher){
	this.akku = akku;
	this.reg1 = reg1;
	this.reg2 = reg2;
	this.reg3 = reg3;
	this.speicher = speicher;
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
}

Befehlssatz.prototype.clr(reg){
	reg.clearReg();
}

Befehlssatz.prototype.add(reg){
	this.akku.setValue(zweierkomp(reg.getDec() + this.akku.getDec()));
}

Befehlssatz.prototype.addd(zahl){
	this.akku.setValue(zweierkomp(zahl + this.akku.getDec()));
}

Befehlssatz.prototype.inc(){
	this.akku.setValue(zweierkomp(this.akku.getDec() + 1));
}

Befehlssatz.prototype.dec(){
	this.akku.setValue(zweierkomp(this.akku.getDec() - 1));
}

Befehlssatz.prototype.lwdd(reg,speicheraddr){
	reg.setValue(this.speicher[speicheraddr] + this.speicher[speicheraddr+1]);
}

Befehlssatz.prototype.swdd(reg,speicheraddr){
	this.speicher[speicheraddr] = reg.getBin.slice(0,8);
	this.speicher[speicheraddr] = reg.getBin.slice(8,16);
}

Befehlssatz.prototype.swdd(reg,speicheraddr){
	this.speicher[speicheraddr] = reg.getBin.slice(0,8);
	this.speicher[speicheraddr] = reg.getBin.slice(8,16);
}
