function random(){
	setInterval(function(){
	var x = parseInt(Math.random()*500);
	var y = parseInt(Math.random()*500);
	moveIt(document.getElementById('move'),x,y);
	}, 600 );
}
