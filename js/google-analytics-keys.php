<?php
if ( !session_id() ) { @session_start(); }
$MFFTrackingID = "";
if ( array_key_exists("MOKHET_GOOGLE_ANALYTICS", $_SESSION) ) { $MFFTrackingID = $_SESSION["MOKHET_GOOGLE_ANALYTICS"]; }
else
{
 $tmp = explode("/", $_SERVER["REQUEST_URI"]);
 if ( is_array($tmp) && count($tmp) == 3 )
 {
  $tmp = $tmp[1];
  if ( $tmp == "MFF" ) { $MFFTrackingID = "UA-92278331-1"; }
  else if ( $tmp == "MFF-beta" ) { $MFFTrackingID = "UA-92278331-3"; }
  else if ( $tmp == "MFF-previous" ) { $MFFTrackingID = "UA-92278331-4"; }
 }
}
if ( !isset($noOutput) )
{
 header("Content-type: text/javascript");
 echo "var MFFTrackingID = \"$MFFTrackingID\";";
}
?>