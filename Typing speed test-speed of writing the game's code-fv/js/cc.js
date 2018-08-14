//http://stackoverflow.com/a/1846704
$(document).keypress(function(event){
	if(!x.isTesting)
		return;
	var ch=String.fromCharCode(event.which);
	x.checkLetter(ch); 
	event.preventDefault();
});
var GAMEENGINE=function(){};
GAMEENGINE.prototype={
	testParag : null,
	timer     : null,
	rightWords: null,
	wrongWords: null,
	currWord  : null,
	currLevel : null,
	timerFn   : null,
	isTesting : null,
	cLetters  : null,
	wLetters  : null,
	ispaused  : false,
	i         : 0,
	init: function(){
		this.testParag  = "";
		this.timer      = 0;
		this.rightWords = 0;
		this.wrongWords = 0;
		this.currWord   = 0;
		this.cLetters   = 0;
		this.wLetters   = 0;
		this.currLevel  = "";
		this.isTesting  = false;
		this.ispaused   = false;
		this.i          = 0;

		window.clearInterval( this.timerFn );
		$('.blackScreen').css('display', 'none');
		$('#pause').text('pause');
	},
	startLevel: function(){
		this.init();
		this.testParag=	$('.wordsarena').text().trim().split("");
		$('.wordsarena').html('');
		for(var i=0; i<this.testParag.length; i++){
			var theSpan=document.createElement('span');
			$(theSpan).text(this.testParag[i]);
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
		    $('.circle_animation').css('stroke-dashoffset', 440-($this.i*(440/60)));
		    $('.clockh2').text($this.i);
		    $this.i++;
			if($this.timer < 0)
				$this.afterFinished();
		    
		} ,1000);
	},
	checkLetter: function(ch){
		var wordSpan=$('.wordsarena span:nth-child(' + (this.currWord+1) + ')');
		var currentWord = $(wordSpan).text();

		if(ch == currentWord){
			this.cLetters++;
			this.currentWord++;

			this.rightWords++;
			this.currWord++;
			
			$('.wordsarena span.current').attr('class', '');
			$('.wordsarena span:nth-child(' + (this.currWord+1) + ')').attr('class', 'current');
			if(this.currWord == this.testParag.length){
				this.afterFinished();
				return;
			}

		} else {
			this.wLetters++;
			$('.wordsarena span.current').attr('class', 'wrong');
			$('.wordsarena span:nth-child(' + (this.currWord+2) + ')').attr('class', 'current');
			this.wrongWords++;
			this.currWord++;
			this.curLetter=0;
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
parArr['test1']="Hello My name is ahmad\nWhat is yours?";
parArr['test2']="aaa ssss dddd ffff ggg hhh jk";
parArr['test3']="e bfvwje kfgwj hfmewghgwfe fhjw gfuwjhgf whjf gwghw fytweh fwegh fweytgh wefdghw fdywg dfvwygh";

$('#levels').on('change',function(){
	var levelText=$('#levels').val(parArr[level]);
	$('.wordsarena').text(levelText);
});
var x=new GAMEENGINE;

$('#startgame').on('click', function(){
	x.startLevel();	
})

$('#nothanks').on('click',function(){
	$('.blackScreen').css('display', 'none');
});

$('#again').on('click',function(){
	x.startLevel();	
});

$('#Reset').on('click',function(){
	x.startLevel();	
});

$('#pause').on('click',function(){
	if(!x.ispaused){
		$('#pause').text('resume');
		window.clearInterval(x.timerFn);
		x.ispaused=true;
		x.isTesting=false;
	} else {
		$('#pause').text('pause');
		x.timerFn= window.setInterval(
			function(){
				x.timer-=1000;
				if(x.timer < 0)
					x.afterFinished();
			    $('.circle_animation').css('stroke-dashoffset', 440-(x.i*(440/60)));
			    $('clockh2').text(x.i);
			    x.i++;

		} ,1000);
		x.ispaused=false;
		x.isTesting=true;
	}
});
$('#nextlevel').on('click',function(){
	$('#levels')[0].selectedIndex++;
	$('.blackScreen').css('display', 'none');
	var level=$('#levels').val();
	x.startLevel();	
});



function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      var contents = e.target.result;
        //alert( contents);
        $('.wordsarena').html(contents);  
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
}

  document.getElementById('uploadbutton').addEventListener('change', readSingleFile, false);

/*
$('#uploadbutton').on('change',function(){
	jQuery.get($(this).val(), function(data) {
		alert(data);
		$('#div').html(data.replace('n',''));
	});
});
*/

$('.contaner').on('click','#showTips',function(){
	$('#mytips').show();
	$(this).attr('id','hideTips');
});
$('.contaner').on('click','#hideTips',function(){
	$('#mytips').hide();
	$(this).attr('id','showTips');
});

