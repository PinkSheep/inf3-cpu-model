window.onload = function() {
		var fileInput = $("#fileInput");
		var fileDisplayArea = $("#fileDisplayArea");
		var speicher = [];
		
		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			
			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					var arr = reader.result.split(/\n/);
					var speicherIndex = 100;
					$.each(
					    arr,
					    function( index, value ){
					    	speicher[speicherIndex] = value.slice(0,8);
					    	speicher[speicherIndex+1] = value.slice(8,16);
					    	speicherIndex = speicherIndex +2;
					    };
					)
					speicherAktualisiern();
				}

				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}

		});
}
function befehleLaden(speicher){
	index = 100;
	while(index < 500 || speicher[index] != ""){
		$("#befehlTabelle").append("<tr><td>"+index+"</td><td>"+speicher[index]+"</td></tr>");
	}
}

function speicherAktualisieren(speicher){

}
