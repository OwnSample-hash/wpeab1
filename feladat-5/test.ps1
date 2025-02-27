if ($(curl "http://gamf.nhely.hu/ajax2/" -X POST  -d 'op=create' -d 'code=asdf' -d 'name=asd' -d 'height=12' -d 'weight=12' -s | jq) -eq "1") {
    echo "Create test passed"
}else{
    echo "Create test failed"
    exit 1
}

$raw = $(curl "http://gamf.nhely.hu/ajax2/" -X POST  -d 'op=read' -d 'code=asdf' -s)
$lastId = $(echo $raw | jq '.list |= sort_by(.id) | .list[-1].id')
echo $lastId
echo $raw | jq '.list |= sort_by(.id) | .list[-1]'

if ($(curl "http://gamf.nhely.hu/ajax2/" -X POST  -d 'op=update' -d 'code=asdf' -d 'name=dsa' -d 'height=21' -d 'weight=21' -d "id=$($lastId)" -s | jq) -eq "1") {
    echo "Update test passed"
    curl "http://gamf.nhely.hu/ajax2/" -X POST  -d 'op=read' -d 'code=asdf' -s | jq '.list |= sort_by(.id) | .list[-1]'
} else {
    echo "Update test failed"
    exit 1
}

if ($(curl "http://gamf.nhely.hu/ajax2/" -X POST  -d 'op=delete' -d 'code=asdf' -d "id=$($lastId)" -s | jq) -eq "1") {
    echo "Delete test passed"
} else {
    echo "Delete test failed"
    exit 1
}
