//http://stackoverflow.com/a/18053642/4614264
function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return { x: x, y: y };
}
function changesymbol(ch){
	document.getElementById('symbol').value=ch;
}

function makeArray(d1, d2) {
    var arr = new Array(d1), i, l;
    for(i = 0, l = d2; i < l; i++) {
        arr[i] = new Array(d1);
    }
    return arr;
}
var IMAGES=[];
IMAGES['0']='img/grass.jpg';
IMAGES['b']='img/block.jpg';
IMAGES['c']='img/coin.jpg';
var GAMEENGINE = function(){};
GAMEENGINE.prototype={
	canvas  : null,
	ctx     : null,
	squares : null,
	init:function(){
		this.canvas        = document.getElementById("tttCanvas");
		this.ctx           = this.canvas.getContext("2d");

		var height=parseInt(document.getElementById('height').value);
		var width =parseInt(document.getElementById('width').value);

		this.canvas.height = height*60;
		this.canvas.width  = width *60;
		this.squares=makeArray(height,width);
		var $this=this;
		this.canvas.onclick = function(){$this.checkSquare(event);};
		for(var i=0;i<this.squares.length;i++)
			for(var j=0;j<this.squares[i].length;j++)
				this.squares[i][j]='0';
		this.render();
	},
	render:function(){
		for(var i=0;i<this.squares.length;i++)
			for(var j=0;j<this.squares[i].length;j++){
				var img=new Image();
				img.src=IMAGES[this.squares[i][j]];
				this.ctx.drawImage(img, i*60, j*60, 60, 60);
			}
	},
	checkSquare:function(event){
		var pos  = getCursorPosition(this.canvas,event),
		    xpos = Math.floor(pos.x/60),
		    ypos = Math.floor(pos.y/60);

	    var ch = document.getElementById('symbol').value;
	    console.log(xpos+ypos);
		this.squares[xpos][ypos] = ch;
		var img=new Image();
		img.src=IMAGES[ch];
		this.ctx.drawImage(img, xpos*60, ypos*60, 60, 60);
		this.render();
	},
	mapandfunction:function(){
		var str="var map1=[\n";
		for(var i=0;i<this.squares.length;i++){
			var substr="    [";
			for(var j=0;j<this.squares[i].length;j++){
				substr=substr + "'" + this.squares[i][j] + "',";
			}
			substr=substr.substr(0,substr.length-1);
			substr+='],\n';
			str+=substr;
		}
		str=str.substr(0,str.length-2);
		str+='\n];\n';
		document.getElementById('tocode').value=str;
	}
};

var x=new GAMEENGINE;

function init(){
	x.init();
}
function mapandfunction(){
	x.mapandfunction();
}