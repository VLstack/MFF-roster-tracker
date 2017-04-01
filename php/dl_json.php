<?php

if ( function_exists("date_default_timezone_set") ) { date_default_timezone_set("UTC"); }
$JSON = stripslashes($_POST["json"]);
$name = "MFFRosterTracker-" . date("Y-m-d") . ".json";
header("Content-Type: application/json; charset=utf-8");
header("Content-Disposition: attachment; filename=$name");
$output = fopen("php://output", "w");
fwrite($output, $JSON);
fclose($output);

?>