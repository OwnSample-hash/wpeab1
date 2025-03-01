function $(id) {
    return (id === "" ? null : document.getElementById(id));
}

async function template(id, file) {
    await fetch(file)
        .then((response) => {
            if (!response.ok) {
                throw new Error("File not found");
            }
            return response.text();
        })
        .then(data => {
            $(id).innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });
    await fetch(`${file}.js`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("File not found can be ignored");
            }
            return response.text();
        })
        .then(data => {
            node = document.createElement("script");
            node.innerHTML = data;
            $(id).appendChild(node);
        })
        .catch(error => {
            console.error(error);
        });
}
