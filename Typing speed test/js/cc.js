//http://stackoverflow.com/a/1846704
$(document).keypress(function(event){
	if(!x.isTesting)
		return;
	var ch=String.fromCharCode(event.which);
	x.checkLetter(ch); 
});
var GAMEENGINE=function(){};
GAMEENGINE.prototype={
	testParag : null,
	timer     : null,
	rightWords: null,
	wrongWords: null,
	currWord  : null,
	currLetter: null,
	currLevel : null,
	timerFn   : null,
	isTesting : null,
	cLetters  : null,
	wLetters  : null,
	init: function(){
		this.testParag  = "";
		this.timer      = 0;
		this.rightWords = 0;
		this.wrongWords = 0;
		this.currWord   = 0;
		this.currLetter = 0;
		this.cLetters   = 0;
		this.wLetters   = 0;
		this.currLevel  = "";
		this.isTesting  = false;
		$('.wordsarena').html('');
		$('.printedWords').html('');
		window.clearInterval( this.timerFn );
		$('.blackScreen').css('display', 'none');
	},
	startLevel: function(levelName){
		if(parArr[levelName] === undefined){
			alert("This level is not constructed yet.");
			return;
		}
		this.init();
		this.testParag=parArr[levelName].trim().split(" ");
		for(var i=0; i<this.testParag.length; i++){
			var theSpan=document.createElement('span');
			$(theSpan).text(this.testParag[i] + ' ');
			$('.wordsarena').append(theSpan);
		}
		var seconds=60;
		this.timer=seconds*1000;
		this.isTesting=true;
		$('.wordsarena span:nth-child(1)').attr('class', 'current');
		var $this=this;
		this.timerFn= window.setInterval(
			function(){
			$this.timer-=1000;
			if($this.timer < 0)
				$this.afterFinished();

		} ,1000);
	},
	checkLetter: function(ch){
		var wordSpan=$('.wordsarena span:nth-child(' + (this.currWord+1) + ')');
		var currentWord = $(wordSpan).text();

		if(ch == currentWord[this.currLetter]){
			this.cLetters++;
			$('.printedWords').text( $('.printedWords').text()+ch );
			this.currLetter++;
			if(this.currLetter == currentWord.length){
				//$('.printedWords').text( $('.printedWords').text()+' ' );
				this.rightWords++;
				this.currWord++;
				this.currLetter=0;
				$('.wordsarena span.current').attr('class', '');
				$('.wordsarena span:nth-child(' + (this.currWord+1) + ')').attr('class', 'current');
				if(this.currWord == this.testParag.length){
					this.afterFinished();
					return;
				}
			}
		} else {
			this.wLetters++;
			$('.wordsarena span.current').attr('class', 'wrong');
			$('.wordsarena span:nth-child(' + (this.currWord+2) + ')').attr('class', 'current');
			this.wrongWords++;
			this.currWord++;
			this.curLetter=0;
			$('.printedWords').text( $('.printedWords').text()+' ' );
			if(this.currWord == this.testParag.length){
				this.afterFinished();
				return;
			}
		}
	},
	afterFinished: function(){
		window.clearInterval( this.timerFn );
		this.isTesting=false;
		$('#speed').text(this.rightWords + ' WPM');
		$('#Accuracy').text(parseInt(this.rightWords / this.testParag.length *100) + '%');
		$('#CHits').text(this.cLetters);
		$('#WHits').text(this.wLetters);

		var count=0;
		for(var i=0;i<this.testParag.length;i++)
			count+=this.testParag[i].length;
		$('#EHits').text(count);

		if(this.rightWords / this.testParag.length>50)
			$('#medalImage').attr('src', 'img/0041-Medal-Gold-icon.png');
		else if(this.rightWords / this.testParag.length>30)
			$('#medalImage').attr('src', 'img/0039-Medal-Bronze-icon.png');
		else
			$('#medalImage').attr('src', 'img/0040-Medal-Silver-icon.png');

		$('#ratingbox').html('');
		var starImg=new Image();
		starImg.src='img/keditbookmarks.png';
		for(var i=0;i<parseInt(this.rightWords / this.testParag.length>50)/20;i++)
			$('#ratingbox').append( $(starImg).clone() );
		$('.blackScreen').css('display', 'block');

	},
	endLevel: function(){
		init();
	}
};

var parArr=[];
parArr['test1']="Hello My name is ahmad";
parArr['test2']="aaa ssss dddd ffff ggg hhh jk";
parArr['test3']="irg eufjg ejhfg fjhe gfjhemnf ge jhfmng wfjhweg f hwgdg hw gjvwehmfm hgwehvf";
parArr['test4']="e bfvwje kfgwj hfmewghgwfe fhjw gfuwjhgf whjf gwghw fytweh fwegh fweytgh wefdghw fdywg dfvwygh";

var x=new GAMEENGINE;

$('#startgame').on('click', function(){
	var level=$('#levels').val();
	x.startLevel(level);	
})

$('#nothanks').on('click',function(){
	$('.blackScreen').css('display', 'none');
});

$('#again').on('click',function(){
	var level=$('#levels').val();
	x.startLevel(level);	
});

$('#nextlevel').on('click',function(){
	$('#levels')[0].selectedIndex++;
	$('.blackScreen').css('display', 'none');
	var level=$('#levels').val();
	x.startLevel(level);	
});