<?php 


$access_token = 'EAACEdEose0cBAF9ugrSGcq82P6a4R9iA34Qjar9yhLvekfOdZBRjKodsZBegPdw3mE5souT8yBtH5gQemsZASVFXhnI7QohzmyhdDmkJiXI3Jrv3BoRwJdbjUKNckWi9U18ZB4zuD8UEwzVMfchIpURDTCrOZCGT3DAIwd9cT6wbAF537RRWXXxLOrjfcc3MEuGqPGAWTmgZDZD';
$limit=20;

$json_object = file_get_contents('https://graph.facebook.com/'.$page_id.
						'/feed?limit='.$limit.
					  '&access_token='.$access_token );

$fbdata = json_decode($json_object);
