function $(id) {
    return (id === "" ? null : document.getElementById(id));
}

async function template(id, file) {
    await fetch(file)
        .then(response => response.text())
        .then(data => {
            $(id).innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });
    await fetch(`${file}.js`)
        .then(response => response.text())
        .then(data => {
            node = document.createElement("script");
            node.innerHTML = data;
            $(id).appendChild(node);
        })
        .catch(error => {
            console.error(error);
        });
}
