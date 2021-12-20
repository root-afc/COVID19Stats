<?php
header("Access-Control-Allow-Origin: *");
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.covid19api.com/total/country/peru");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$res = curl_exec($ch);
curl_close($ch);
echo $res;
?>