<?php
$name=$_POST['name'];
$email=$_POST['email'];
$message=$_POST['message'];

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
$headers .= 'From:'.$email . "\r\n";
$title = 'Message from '.$name.' [via pulsusgame.com]';

$content="Message from <b>".$name."</b> [via pulsusgame.com] <br /><br />".$message;
mail('pulsus@anthonymattox.com', $title, $content, $headers);
header('Location: http://www.pulsusgame.com/iPad/');

?>