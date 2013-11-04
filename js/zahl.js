function Zahl(bitString){
	this.bitString = bitString;
	this.decValue = this.getDecValue(bitString);
}

Zahl.prototype.getDec = function(){
	return this.decValue;
};

Zahl.prototype.getBin = function(){
	return this.bitString;
};

Zahl.prototype.getDecValue = function(bitString){
	var binArr = bitString.split('');
	if (binArr[0]=='0'){
		return parseInt(bitString,2);
	} else{
		binArr[0] = '0';
		var tempBitStr = binArr.join('');
		return (-32768 + parseInt(tempBitStr,2));
	}
};

Zahl.prototype.setValue = function(zahl){
	this.decValue = zahl;
	this.bitString = this.zweierkomp(zahl);
};

Zahl.prototype.setBinValue = function(bitString){
	this.decValue = this.getDecValue(bitString);
	this.bitString = bitString;
};

Zahl.prototype.zweierkomp = function(zahl){
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
		    }
		);
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

Zahl.prototype.clearReg = function(){
	this.bitString = '0000000000000000';
	this.decValue = 0;
};
