<?php

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');


function sendMessage($data) {
    echo "data: " . json_encode($data) . "\n\n";
    ob_flush();
    flush();
}


while (true) {
    $time = date('H:i:s');
    sendMessage(["time" => $time]);

    sleep(1);
}
?>