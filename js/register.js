function Register(bitString){
	Zahl.call(this,bitString);
}

Register.prototype.clearReg = function(){
	this.bitString = '0000000000000000';
	this.decValue = 0;
};