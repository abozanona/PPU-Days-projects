<?php include "fn.php";?>
<!DOCTYPE html>
<html>
<head>
	<title>compiler</title>
	<link rel="stylesheet" type="text/css" href="onlinecompiler.css">
	<link rel="stylesheet" href="style.css">

</head>
<body>


<div class="main">

	<div class="head">
	C++ Compiler
	</div>

	<div class="line">
	</div>

	<div class="content">
	<form method="post" action="index.php">
	 <div class="left-div">
	 C++ code : <br><textarea rows="35" cols="40" name="code"></textarea><br><br>
	 </div>
	 
	 <div class="right-div">
	 input :</br> <textarea cols="40" rows="5" name="in"></textarea><br><br>
	 
	 <input class="butt_sub" name="codePress" type="submit" value="Calculate" ><br><br>
	 The Result :  <br><textarea rows="10" cols="40"><?php foreach ($result as $key => $value) {echo $value . "\n";}?></textarea>
	 <br><br>
	 </div>
	</form>
	</div>

</div>

</body>
</html>