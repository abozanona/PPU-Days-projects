$(document).keypress(function(e){
	var speed=10;
	if     (e.which == 52)
		x.p2.x-=speed;
	else if(e.which == 56)
		x.p2.y-=speed;
	else if(e.which == 54)
		x.p2.x+=speed;
	else if(e.which == 53)
		x.p2.y+=speed;

	else if(e.which == 97)
		x.p1.x-=speed;
	else if(e.which == 100)
		x.p1.x+=speed;
	else if(e.which == 119)
		x.p1.y-=speed;
	else if(e.which == 115)
		x.p1.y+=speed;

	if(x.p1.x<0)
		x.p1.x=0;
	if(x.p1.y<0)
		x.p1.y=0;
	if(x.p2.x<0)
		x.p2.x=0;
	if(x.p2.y<0)
		x.p2.y=0;

	if(x.p1.x>x.canvas.width)
		x.p1.x=x.canvas.width;
	if(x.p1.y>x.canvas.height)
		x.p1.y=x.canvas.height;
	if(x.p2.x>x.canvas.width)
		x.p2.x=x.canvas.width;
	if(x.p2.y>x.canvas.height)
		x.p2.y=x.canvas.height;

	if     (e.which == 120 && x.p1HasShooted==false){
		x.p1HasShooted=true;
		x.p1S.x=x.p1.x;
		x.p1S.y=x.p1.y;
	}
	else if(e.which == 50  && x.p2HasShooted==false){
		x.p2HasShooted=true;
		x.p2S.x=x.p2.x;
		x.p2S.y=x.p2.y;
	}
	e.preventDefault();
});
var GAMEENGINE=function(){};
GAMEENGINE.prototype={
	canvas       : null,
	ctx          : null,
	blocksArray  : {x:[], y:[], tx:[], ty:[]},
	RandArray    : {x:[], y:[], tx:[], ty:[]},
	fps          : 100,
	blockSize    : 300,
	playerSize   : 10,
	playerAround : 20,
	shoteSize    : 5,
	shoteSpeed   : 5,
	canvasId     : 'canvas',
	blocksNo     : 12,
	p1           : {x:0, y:0},
	p2           : {x:0, y:0},
	p1S          : {x:0, y:0},
	p2S          : {x:0, y:0},
	p1HasShooted : false,
	p2HasShooted : false,
	ended        : false,
	renderfn     : null,
	p1Points     : 0,
	p2Points     : 0,
	init:function(){
		this.canvas         = document.getElementById(this.canvasId);
		this.ctx            = this.canvas.getContext("2d");

		this.p1.x=0;
		this.p2.x=this.canvas.width;
		this.p1.y=this.canvas.height/2;
		this.p2.y=this.canvas.height/2;

		this.p1S.x=0;
		this.p2S.x=this.canvas.width;
		this.p1S.y=this.canvas.height/2;
		this.p2S.y=this.canvas.height/2;

		this.p1HasShooted = false;
		this.p2HasShooted = false;
		this.ended        = false;

		this.blocksArray.x  = new Array(this.blocksNo);
		this.RandArray.x    = new Array(this.blocksNo);
		this.blocksArray.y  = new Array(this.blocksNo);
		this.RandArray.y    = new Array(this.blocksNo);
		this.blocksArray.tx = new Array(this.blocksNo);
		this.RandArray.tx   = new Array(this.blocksNo);
		this.blocksArray.ty = new Array(this.blocksNo);
		this.RandArray.ty   = new Array(this.blocksNo);

		for (var i = 0; i < this.blocksNo; i++) {
			this.blocksArray.x[i]  = 0;
			this.RandArray.x[i]    = Math.floor(Math.random() * this.canvas.width);
			this.blocksArray.y[i]  = 0;
			this.RandArray.y[i]    = Math.floor(Math.random() * this.canvas.height);
			this.blocksArray.tx[i] = 0;
			this.RandArray.tx[i]   = Math.floor(Math.random() * this.canvas.width);
			this.blocksArray.ty[i] = 0;
			this.RandArray.ty[i]   = Math.floor(Math.random() * this.canvas.height);
		};
		
		var $this=this;
		this.renderfn=window.setInterval(function(){
			$this.render();
		}, 1000/this.fps);
	},
	setP1Points:function(x){
		this.p1Points=parseInt(x);
	},
	setP2Points:function(x){
		this.p2Points=parseInt(x);
	},
	startGame:function(){
		window.clearInterval(this.renderfn);
		this.init();
	},
	die:function(){
		this.ended=true;
		window.clearInterval(this.renderfn);
		this.render();
	},
	render:function(){
		for (var i = 0; i < this.blocksNo; i++) {
			if(this.blocksArray.x[i]>this.RandArray.x[i])
				this.blocksArray.x[i]--;
			else if(this.blocksArray.x[i]<this.RandArray.x[i])
				this.blocksArray.x[i]++;
			else
				this.RandArray.x[i] = Math.floor(Math.random() * this.canvas.width);

			if(this.blocksArray.y[i]>this.RandArray.y[i])
				this.blocksArray.y[i]--;
			else if(this.blocksArray.y[i]<this.RandArray.y[i])
				this.blocksArray.y[i]++;
			else
				this.RandArray.y[i] = Math.floor(Math.random() * this.canvas.width);
		}

		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = 'white';
		this.ctx.fill();
		//>>>>>>>>>
		if(!this.ended)
			for(var i=0;i<this.blocksNo;i++){
				this.ctx.beginPath();
				//this.ctx.rect(0, this.HblocksArray[i]*2, this.canvas.width, this.canvas.height/this.blocksNo);
				this.ctx.rect(this.blocksArray.x[i], this.blocksArray.y[i], this.blockSize, this.blockSize);
				this.ctx.fillStyle = 'black';
				this.ctx.fill();
			}
		//players
		this.ctx.beginPath();
		this.ctx.arc(this.p1.x, this.p1.y, this.playerSize, 0, 2*Math.PI);
		this.ctx.fillStyle = 'black';
		this.ctx.fill();
		//players
		this.ctx.beginPath();
		this.ctx.arc(this.p2.x, this.p2.y, this.playerSize, 0, 2*Math.PI);
		this.ctx.fillStyle = 'black';
		this.ctx.fill();


		//print Score
		this.ctx.font = "20px Georgia";
		this.ctx.fillStyle = "red";
		this.ctx.fillText("Player one:" + this.p1Points, 10, 20);

		this.ctx.font = "20px Georgia";
		this.ctx.fillStyle = "red";
		this.ctx.fillText("Player two:" + this.p2Points, this.canvas.width-150, 20);



		//shoots
		if(this.p1HasShooted){
			if(!this.ended)
				this.p1S.x+=this.shoteSpeed;
			this.ctx.beginPath();
			this.ctx.arc(this.p1S.x, this.p1S.y, this.shoteSize, 0, 2*Math.PI);
			this.ctx.fillStyle = 'red';
			this.ctx.fill();
			if(this.p1S.x>this.canvas.width)
				this.p1HasShooted=false;
			if(!this.ended)
				if(Math.abs(this.p2.x-this.p1S.x)<this.playerAround&&Math.abs(this.p2.y-this.p1S.y)<this.playerAround){
					this.die();
					this.ctx.font = "30px Georgia";
					this.ctx.fillStyle = "brown";
					this.ctx.fillText("+1", 10, 50);
					this.p1Points++;
				}
		}
		//shoots
		if(this.p2HasShooted){
			if(!this.ended)
				this.p2S.x-=this.shoteSpeed;
			this.ctx.beginPath();
			this.ctx.arc(this.p2S.x, this.p2S.y, this.shoteSize, 0, 2*Math.PI);
			this.ctx.fillStyle = 'red';
			this.ctx.fill();
			if(this.p2S.x<0)
				this.p2HasShooted=false;
			if(!this.ended)
				if(Math.abs(this.p1.x-this.p2S.x)<this.playerAround&&Math.abs(this.p1.y-this.p2S.y)<this.playerAround){
					this.die();
					this.ctx.font = "30px Georgia";
					this.ctx.fillStyle = "brown";
					this.ctx.fillText("+1", this.canvas.width-150, 50);
					this.p2Points++;
				}
		}

	}
};

var x = new GAMEENGINE();