function makeArray(d1, d2) {
    var arr = new Array(d1), i, l;
    for(i = 0, l = d2; i < l; i++) {
        arr[i] = new Array(d1);
    }
    return arr;
}


var GAMEENGINE=function(){};
GAMEENGINE.prototype = {
    canvas        : null,
	ctx           : null,
	renderEvent   : null,
	fps           : 20,
	width         : 10,
	height        : 10,
	boxsize       : 60,
	mex           : 0,
	mey           : 0,
	meImg         : null,
	canvasId      : "gamecanvas",
	coins         : 0,
	coinsInMap    : 0,
	visitedArray  : [],
	foundAStep    : false,
	ordersStack   : [],
	ordersStackfn : null,
	isRobotOnFire : false,
	init:function(){
		this.canvas    = document.getElementById(this.canvasId);
		this.ctx       = this.canvas.getContext("2d");
		this.meImg     = new Image();
		this.coins     = 0;
		this.meImg.src = "img/player.png";
		this.canvas.height=this.height*this.boxsize;
		this.canvas.width =this.width *this.boxsize;

		var img=new Image();
		img.src="img/bg.jpg";
		var $this=this;
		this.renderEvent=setInterval(function(){$this.render()} ,parseInt(1000/this.fps));
		if(this.ordersStackfn)
			window.clearInterval(this.ordersStackfn);
		var $this=this;
		this.ordersStackfn=setInterval(function(){
			if($this.ordersStack[0])
				if($this.ordersStack[0]=='r')
					toright();
				else if($this.ordersStack[0]=='l')
					toleft();
				else if($this.ordersStack[0]=='u')
					toup();
				else if($this.ordersStack[0]=='d')
					todown();
			$this.ordersStack.shift();
		},200);
	},
	render:function(){
		$('#'+this.canvasId).css("background-image", "url(img/bg.jpg)");
		if(this.map)
			for(var i=0;i<this.height; i++)
				for(var j=0;j<this.width; j++){
					if(this.map && this.map[i] && this.map[i][j])
						this.ctx.drawImage(this.map[i][j].img, i*this.boxsize, j*this.boxsize, this.boxsize, this.boxsize);
					if(this.mex == i && this.mey == j)
						this.ctx.drawImage(this.meImg, i*this.boxsize, j*this.boxsize, this.boxsize, this.boxsize);
				}
	},
	setMap:function(map,width,height){
		this.coinsInMap=0;
		for(var i=0;i<map.length;i++)
			for(var j=0;j<map[i].length;j++)
				if(map[i][j])
					if(map[i][j] == 'b')
						map[i][j]=new block();
					else if(map[i][j] == '0')
						map[i][j]=new grass();
					else if(map[i][j] == 'c'){
						map[i][j]=new coin();
					}
		for(var i=0;i<this.height;i++)
			for(var j=0;j<this.width;j++)
				if(map[i][j] instanceof coin)
					this.coinsInMap++;
		this.map    =map;
		this.width  =width;
		this.height =height;
		this.init();
		this.isRobotOnFire=false;
	},
	gotothe:function(a,b){
		var x = this.mex + a,
			y = this.mey + b;
		if(this.map[x] && this.map[x][y] && !(this.map[x][y] instanceof block)){
			this.mex=x;
			this.mey=y;
			this.palyerMove(x,y);
			this.map[x][y].img.src="img/grass.jpg";
		}
	},
	palyerMove:function(x,y){
		if(this.map[x][y] instanceof coin){
			this.map[x][y]=new grass();
			this.coins++;
			this.coinsInMap--;
			console.log('coins++;');
			if(this.isRobotOnFire == true)
				this.myrobot();
		}
	},
	myrobot:function(){

		if(this.coinsInMap == 0){
			console.log('Robot Says:');
			console.log("Mission Accomplished.")
		}
		var consoleLog=[
			['On my way.'],
			['Sir, Yes sir.'],
			['Roger that.'],
			['it\'s an honor to help you Sir.'],
			['On my next mission.'],
			['That would be very easy Sir.'],
		];
		console.log('Robot Says:');
		console.log('> ' + consoleLog[Math.floor(Math.random()*consoleLog.length)][0]);
		this.isRobotOnFire=true;

		//find a coin
			this.foundAStep=false;
			this.visitedArray=makeArray(this.height,this.width);
			for(var i=0;i<this.visitedArray.length;i++)
				for(var j=0;j<this.visitedArray[i].length;j++)
					this.visitedArray[i][j] = false;
			this.findTheClosestFrom('', this.mex, this.mey);

	},executeOrder:function(steps){
		console.log(steps);
		var x=this.mex, y=this.mey;
		for(var i=0;i<steps.length-1;i++){
			if(steps[i]=='r')
				x++;
			else if(steps[i]=='l')
				x--;
			else if(steps[i]=='u')
				y--;
			else if(steps[i]=='d')
				y++;

			this.map[x][y].img.src="img/grass-dots.jpg";
		}
		for(var i=0;i<steps.length;i++)
			this.ordersStack.push(steps[i]);
	},
	findTheClosestFrom:function(steps, x, y){
		if(x<0 || y<0 || x>=this.height || y>=this.width)
			return;
		if(this.foundAStep)
			return;
		if(this.visitedArray[x][y] || this.map[x][y] instanceof block)
			return 0;
		this.visitedArray[x][y]=true;
		if(this.map[x][y] instanceof coin){
			this.executeOrder(steps);
			this.foundAStep=true;
		}
		this.findTheClosestFrom(steps+'u', x, y-1);
		this.findTheClosestFrom(steps+'d', x, y+1);
		this.findTheClosestFrom(steps+'r', x+1, y);
		this.findTheClosestFrom(steps+'l', x-1, y);
}


}
var x=new GAMEENGINE;

//block
var block=function(){
	this.img=new Image();
	this.img.src=this.src;
};
block.prototype={
	src  :"img/block.jpg",
	img  :null
};

//grass
var grass=function(){
	this.img=new Image();
	this.img.src=this.src;
};
grass.prototype={
	src  :"img/grass.jpg",
	img  :null
};

//coin
var coin=function(){
	this.img=new Image();
	this.img.src=this.src;
};
coin.prototype={
	src  :"img/coin.jpg",
	img  :null
};

var map1=[
    ['0','0','0','0','0','0','b','0','0','c','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','c','0','b','0','c','0','b','0','b','b','b','0','b','b','b','0','b','0'],
    ['b','b','b','0','b','0','b','0','b','0','b','0','0','0','b','0','c','c','b','0'],
    ['c','0','b','0','b','0','b','0','b','0','b','0','b','0','b','0','0','0','b','c'],
    ['0','0','b','c','0','0','b','0','0','0','b','0','c','0','0','b','0','b','b','0'],
    ['0','0','b','0','b','0','b','0','b','0','b','0','b','0','0','0','0','0','b','0'],
    ['0','0','0','0','b','0','b','c','b','0','c','0','b','b','b','b','0','0','0','c'],
    ['b','b','b','0','b','0','0','0','b','0','b','0','b','c','0','0','0','0','b','0'],
    ['0','0','0','0','b','b','b','b','0','0','b','0','b','b','b','c','b','b','b','0'],
    ['0','b','b','0','b','0','c','0','b','0','b','0','b','0','0','0','0','0','b','c'],
    ['0','0','0','0','b','0','b','b','0','0','b','0','0','0','0','b','c','0','b','b'],
    ['b','0','b','0','0','0','0','0','0','c','b','0','b','0','b','b','b','b','b','0'],
    ['c','0','b','b','0','b','b','0','b','0','b','0','b','0','0','0','0','0','b','c'],
    ['0','b','b','0','0','0','b','0','b','b','b','0','b','0','0','b','0','c','0','0'],
    ['0','c','b','0','b','0','b','0','0','0','c','b','0','c','b','b','b','0','b','0'],
    ['b','0','0','0','b','0','c','b','0','0','b','c','0','b','b','b','b','b','b','c'],
    ['c','0','b','0','0','0','b','0','0','0','c','b','0','0','0','b','0','0','b','0'],
    ['0','b','b','b','b','b','0','0','b','0','b','c','0','0','0','0','0','0','b','0'],
    ['0','0','b','0','b','0','b','b','b','0','c','b','b','0','b','b','b','0','0','0'],
    ['b','0','0','c','0','0','0','0','0','0','0','0','0','0','0','0','b','b','b','c']
];


function toright()  {x.gotothe(1,0);}
function toleft()   {x.gotothe(-1,0);}
function toup()    {x.gotothe(0,-1);}
function todown() {x.gotothe(0,1);}
