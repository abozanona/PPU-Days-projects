<!DOCTYPE html>
<html lang="en">
<head>
  <title>PPU facebook</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <link type="text/css" rel="stylesheet" href="main.css" />
</head>



<body>
	  <div class="jumbotron text-center">
	    <h1>PPU facebook !</h1>
	    <p> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
	    &nbsp without facebook </p>
	  </div>



		<div class="container-fluid">
		  <div class="row">
		    <div class="col-sm-9">
		      <h2>About PPU-Facebook </h2>
		      
		      <h4> <span class=" head" > " Real " place for " Real " Study ! </span></h4>
		      <p class = " paragraph" > <span class = "h "> I'm Wasting all My time in Social Media</span> ! There <strong>  won't </strong> be Wasting Time anymore after visiting this website .<br> YUP! your marks will goes up Significantly ! you will get the mess out of your life , Trust Us .<br> Watch the video and Judge ! </p>
		    </div>

		    <div class="col-sm-2">
		      <span class=" glyphicon glyphicon-thumbs-up logo"></span>
		    </div>
		  </div>
		</div>
		
			<?php $data=$fbdata->data;?>
			<div class="container allposts">
			<?php foreach($data as $post){?>
				<div class="row post">
					<div class="col-md-12">
						<h3><?= $post->from->name?></h3>
					</div>
					<div class="col-md-12">
						<?php if(isset($post->message)) echo $post->message?>
					</div>
					<hr/>
					<?php 
					$comments=array();
					if(isset($post->comments))
						$comments=$post->comments->data;
					foreach($comments as $comment){?>
					<div class="col-md-12 comments">
						<div class="row singlecomment">
							<div class="col-md-12">
								<b><?= $comment->from->name?></b>
							</div>
							<div class="col-md-12">
								<?php if(isset($comment->message)) echo $comment->message?>
							</div>
							<hr/>
						</div>
					</div>
					<?php }?>
				</div>
			<?php }?>
			</div>

<footer class="container-fluid text-center">
  <p>Footer Text</p>
</footer>



</body>
</html>
