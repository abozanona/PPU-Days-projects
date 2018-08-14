
<?php
header('Content-type: text/html; charset=utf-8');

if(isset($_POST['code']) && isset($_POST['codePress'])){
	$current=$_POST['code'];
	file_put_contents("y.cpp", $current);
echo getcwd();
	$infile="";
	if(isset($_POST['in']))
		$infile=$_POST['in'];
	file_put_contents("file.in", $infile);

	exec("sudo su www-data;g++ y.cpp -x c++ -o y.out 2>&1 || cat?", $result);

	if(!empty($result)){
		echo "Something went wrong!<br/>";
		echo '<hr/>';
		echo "Error Description:<br/>";
		echo '<pre>';
		print_r($result);
		echo '</pre>';
		die('');
	}

	exec("./y.out < file.in || echo $?", $result);

	echo 'Filed was Compiled Successfully';
	echo '<hr/>';

}