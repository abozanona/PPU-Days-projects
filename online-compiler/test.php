<?php
header('Content-type: text/html; charset=utf-8');


exec("sudo su www-data;g++ y.cpp -x c++ -o y.out || echo $?", $result);

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
echo '<pre>';
foreach ($result as $key => $value) {
	echo $value . "\n";
}
echo '</pre>';

