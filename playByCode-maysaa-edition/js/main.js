function makeArray(d1, d2) {
    var arr = new Array(d1), i, l;
    for(i = 0, l = d1; i < l; i++) {
        arr[i] = new Array(d2);
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
	coinsPos      : [],
	mapOneDim     : null,
	p             : null,
	s 			  : [],
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
		coinsPos = [];
		this.mapOneDim=makeArray(height*width,height*width);
		this.p=makeArray(height*width,height*width);
		
		for(var i=0;i<(height*width);i++)
			for(var j=0;j<(height*width);j++)
			{
				this.mapOneDim[i][j]=1000000;
				this.p[i][j]=i;
			}
			
			
		for(var adj=0;adj<(width*height);adj++){
			this.mapOneDim[adj][adj]=0;
			var y= Math.floor(adj/height) , x=adj%height;
			if( map[x][y] != 'b'){
				if( (x+1) < height){
					if(map[x+1][y]!='b')
						this.mapOneDim[adj][adj+1]=1;
				}
				
				if( (x-1) >=0){
					if(map[x-1][y]!='b')
						this.mapOneDim[adj][adj-1]=1;
				}
				
				if( (y+1) < height){
					//console.log(map[x+1][y]!='b');
					if(map[x][y+1]!='b')
						this.mapOneDim[adj][adj+width]=1;
				}
				if( (y-1)>=0 ){
					if(map[x][y-1]!='b')
						this.mapOneDim[adj][adj-width]=1;
				}
			}
		}
		

		
		for (var k = 0; k < (height*width); k++)
			for (var i = 0; i < (height*width); i++)
				for (var j = 0; j < (height*width); j++)
					if(this.mapOneDim[i][j] > (this.mapOneDim[i][k] + this.mapOneDim[k][j]) ){
						var y1=Math.floor(i/height),x1= (i%height);
						var y2=Math.floor(j/height),x2= (j%height);
						var y3=Math.floor(k/height),x3= (k%height);
						if( (map[x1][y1]!='b')&& (map[x2][y2]!='b') && (map[x3][y3]!='b') && i!=j){
							
							//console.log(i+' '+j+' '+k+'          '+x1+'   '+y1+'    '+x2+'    '+y2+'    '+x3+'   '+y3);
							this.mapOneDim[i][j] = this.mapOneDim[i][k] + this.mapOneDim[k][j];
							this.p[i][j] = this.p[k][j];
						}
					}	
			
			
		var indexOne=0;
		for(var j=0;j<height;j++)
			for(var i=0;i<width;i++)
				if(map[i][j])
				{
					if(map[i][j] == 'b')
						map[i][j]=new block();
					else if(map[i][j] == '0')
						map[i][j]=new grass();
					else if(map[i][j] == 'c'){
						map[i][j]=new coin();
						this.coinsPos[this.coinsInMap]=indexOne;
						this.coinsInMap++;
					}
					indexOne++;
				}
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
		}
	},
	palyerMove:function(x,y){
		if(this.map[x][y] instanceof coin){
			this.map[x][y]=new grass();
			this.coins++;
			this.coinsInMap--;
			console.log('coins++;');
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
		this.findTheClosestFrom('', (this.mey*this.width) + this.mex);

	},executeOrder:function(steps){
		for(var i=0;i<steps.length;i++)
			this.ordersStack.push(steps[i]);
	},
	findTheClosestFrom:function(steps , MyPos){
		console.log(MyPos);
		if(MyPos <0 || MyPos>=(this.width*this.height))return;
		if(this.coinsInMap <= 0) return;
		var min=100000,indexMin=-1;
		for(var i=0;i<this.coinsPos.length;i++){
			if(this.coinsPos[i] != -1){
				if(this.mapOneDim[MyPos][this.coinsPos[i]] < min){
					min=this.mapOneDim[MyPos][this.coinsPos[i]];
					indexMin=i;
				}
			}
		}
		var to =this.coinsPos[indexMin];
		this.coinsPos[indexMin]=-1;
		var y=Math.floor(to/this.width),x = to%this.width;

		this.s=null;
		this.s=[];
		this.printPath(MyPos,to);
		for(var i=0;i<this.s.length-1;i++) {
			if(this.s[i+1] == (this.s[i]+this.width)) {steps+='d';console.log('down');}
			else if(this.s[i+1] == (this.s[i]-this.width)) {console.log('up');steps+='u'}
			else if(this.s[i+1] == (this.s[i]+1) ) {console.log('right');steps+='r'}
			else if(this.s[i+1] == (this.s[i]-1)) {console.log('left');steps+='l'}
			console.log(this.s[i]+'   '+this.s[i+1]);
		}
		this.executeOrder(steps);
		this.findTheClosestFrom('',to);
	},
	printPath:function(i , j){
		if (i != j)
			this.printPath(i, this.p[i][j]);
		this.s.push(j);
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
