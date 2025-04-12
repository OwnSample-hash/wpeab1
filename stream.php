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
    $time = new DateTime('now', new DateTimeZone('Europe/Budapest'));
    sendMessage(["time" => $time->format('Y-m-d H:i:s')]);

    sleep(1);
}
?>
