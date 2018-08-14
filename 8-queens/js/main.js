//http://stackoverflow.com/a/18053642/4614264
function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return { x: x, y: y };
}
var GAMEENGINE = function(){};
GAMEENGINE.prototype={
    n        : 8,
	pieces   : 0,//remained
	map      : [],
	canvas   : null,
	ctx      : null,
	blockSize: 50,
	imgsrc   : "http://previewcf.turbosquid.com/Preview/2014/05/25__02_35_51/Queen01.jpg5a27650e-74a9-4f41-84f7-81ba38598fbbLarger.jpg",
	img      : null,
	imgredsrc: "http://thumbs.dreamstime.com/z/queen-chess-piece-red-glass-isolated-clipping-path-included-43949851.jpg",
	imgred   : null,
	canPlay  : false,
	timeFn   : null,
	time     : 60,
	init  : function(){
		this.pieces = this.n;
		this.map=new Array(this.n);
		for (var i=0; i <this.n; i++){
		    this.map[i]=new Array(this.n);
		    for(var j=0; j <this.n; j++)
		    	this.map[i][j]=0;
		}
		this.pieces     = this.n;
		this.canvas     = document.getElementById('canvas');
		this.ctx        = this.canvas.getContext("2d");
		this.img        = new Image();
		this.img.src    = this.imgsrc;
		this.imgred     = new Image();
		this.imgred.src = this.imgredsrc;
		this.time       = 60;
		this.canPlay    = true;
		var $this=this;
		this.canvas.onclick = function(){
			if(!$this.canPlay)
				return;
			$this.checkSquare(event);
			$this.render();
		};
		window.clearInterval(this.timeFn);
		this.timeFn = window.setInterval(function(){
			$this.time--;
			if($this.time == 0)
				$this.lose();
		},1000);
		this.render();
	},
	render: function(){
		var HWsize = this.blockSize * this.n;
		this.canvas.height = HWsize;
		this.canvas.width  = HWsize;
		this.ctx.fillRect(0, 0, HWsize, HWsize);
		for(var i=0;i<this.n;i++)
			for (var j = 0; j < this.n; j++){
				if( (i + j) % 2 == 0)
					this.ctx.clearRect(i*this.blockSize, j*this.blockSize, this.blockSize, this.blockSize);
				if(this.map[i][j] == 1)
					this.ctx.drawImage(this.img, i*this.blockSize+2, j*this.blockSize+2, this.blockSize-4, this.blockSize-4);
				else if(this.map[i][j] == 2)
					this.ctx.drawImage(this.imgred, i*this.blockSize+2, j*this.blockSize+2, this.blockSize-4, this.blockSize-4);

			}
	},
	check: function(){
		for(var i=0;i<this.n;i++)
			for(var j=0;j<this.n;j++)
				if(this.map[i][j]==2)
					this.map[i][j]=1;

		var b=true;
		for(var i=0;i<this.n;i++)
			for(var j=0;j<this.n;j++)
				if(this.map[i][j]==1 || this.map[i][j]==1)
					b = this.checkBlock(i,j) && b;
		return b;
	},
	checkBlock: function(x,y){
	
		var win = true;
		for(var i=0;i<this.n;i++)
			if(this.map[x][i] == 1 || this.map[x][i] == 2)
				if(i!=y){
					this.map[x][y] = 2;
					this.map[x][i] = 2;
					win = false;
				}

		for(var i=0;i<this.n;i++)
			if(this.map[i][y] == 1 || this.map[i][y] == 2)
				if(i!=x){
					this.map[x][y] = 2;
					this.map[i][y] = 2;
					win = false;
				}

		for(var i=0;i<this.n;i++)
			for(var j=0;j<this.n;j++)
				if(this.map[i][j] == 1 || this.map[i][j] == 2)
					if(i!=x && j!=y && Math.abs(x-i) == Math.abs(y-j)){
						this.map[x][y] = 2;
						this.map[i][j] = 2;
						win = false;					
					}
		if(win)
			return 1;
		else
			return 0;
	},
	checkSquare: function(event){
		var pos  = getCursorPosition(this.canvas,event),
		    xpos = Math.floor(pos.x / this.blockSize),
		    ypos = Math.floor(pos.y / this.blockSize);
	    if(this.map[xpos][ypos] == 1 || this.map[xpos][ypos] == 2){
	    	this.pieces++;
	    	this.map[xpos][ypos] = 0;
	    } else if(this.pieces != 0){
	    	this.pieces--;
	    	this.map[xpos][ypos] = 1;
	    }
	    var isWin = this.check();
	    this.render();
	    if(isWin && this.pieces == 0)
	    	this.win();
	},
	win: function(){
		this.canPlay = false;
		alert("You win!");
		window.clearInterval(this.timeFn);
	},
	lose: function(){
		window.clearInterval(this.timeFn);
		for(var i=0;i<this.n;i++)
			for(var j=0;j<this.n;j++)
				if(this.map[i][j] == 1)
					this.map[i][j] = 2;
		this.render();
		this.canPlay=false;
		alert("You lose.");
	}
};

var x = new GAMEENGINE();