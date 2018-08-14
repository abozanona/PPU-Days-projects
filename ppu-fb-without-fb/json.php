<?php

//https://lookup-id.com/
//https://developers.facebook.com/tools/explorer/?pnref=story

header('content-type:text/html;charset=utf-8');

$page_id = '825791274119151';
$access_token = 'EAACEdEose0cBAF9ugrSGcq82P6a4R9iA34Qjar9yhLvekfOdZBRjKodsZBegPdw3mE5souT8yBtH5gQemsZASVFXhnI7QohzmyhdDmkJiXI3Jrv3BoRwJdbjUKNckWi9U18ZB4zuD8UEwzVMfchIpURDTCrOZCGT3DAIwd9cT6wbAF537RRWXXxLOrjfcc3MEuGqPGAWTmgZDZD';
$since='2011-05-01';
$until='2011-10-01';
$limit=100;

$json_object = file_get_contents('https://graph.facebook.com/'.$page_id.
						'/feed?limit='.$limit.
//							 '&since='.$since.
//							 '&until='.$until.
					  '&access_token='.$access_token );

$fbdata = json_decode($json_object);


echo'<pre>';
print_r($fbdata);
return;

foreach ($fbdata->data as $post )
{
echo'<pre>';
print_r($post);
echo '[message] => '.$post->message."\n";
echo '[link] => '.'<a href="https://www.facebook.com/258220121572/'.substr ($post->id ,strpos($post->id, '_')+1).'">go to '.$post->id.'</a>'."\n";
echo '[created_time] => '.$post->created_time."\n";
echo '[picture] => <img src="'.$post->picture.'"><br/>';
echo '<br/><br/><br/>';
echo'</pre><hr/>';
}