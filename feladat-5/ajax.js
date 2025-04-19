// const url = "http://gamf.nhely.hu/ajax2/";
const url = "/proxy/"; // https ről nem kérhetek http tartalmat nginx reverse proxyval oldom meg

function $(id) {
  return id === "" ? null : document.getElementById(id);
}

ids = [];

function setStatus(text, isError = false) {
  $("status").innerHTML = text;
  if (isError) {
    $("status-container").className = "bg-red py-0-5 rounded mx-2 px-2";
  } else {
    $("status-container").className = "bg-green py-0-5 rounded mx-2 px-2";
  }
}

function _validateInput(fieldId) {
  if (
    $(fieldId).value.length <= 0 ||
    $(fieldId).value.length > 30 ||
    $(fieldId).value === ""
  ) {
    $(fieldId).classList.add("br-red");
    console.log("error for ", fieldId);
    return false;
  }
  $(fieldId).classList.remove("br-red");
  console.log("pass ", fieldId);
  return true;
}

function heightStuff(heights) {
  $("height-sum").innerHTML = ((arr) =>
    arr.reduce((acc, curr) => acc + curr, 0))(heights);
  $("height-avg").innerHTML = ((arr) =>
    arr.reduce((acc, curr) => acc + curr, 0) / arr.length)(heights).toFixed(2);
  $("height-max").innerHTML = Math.max(...heights);
}

const stuffs = ["Id", "Név", "Magasság", "Súly", "Frissítés", "Törlés"];
const classes = "text py-2 px-2";

async function read() {
  setStatus("Olvasás...");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: "op=read&code=" + $("code").value,
  })
    .then((data) => {
      if (!data.ok) {
        console.log("error");
        setStatus("Error", true);
        return;
      }
      return data.text();
    })
    .then((data) => {
      data = JSON.parse(data);
      removeInsertRow();
      $("tbl").innerHTML = "";

      let tblHeader = document.createElement("thead");

      let headerRow = document.createElement("tr");

      stuffs.forEach((stuff) => {
        let th = document.createElement("th");
        th.className = classes;
        th.innerHTML = stuff;
        headerRow.appendChild(th);
      });

      tblHeader.appendChild(headerRow);
      $("tbl").appendChild(tblHeader);

      let tblBody = document.createElement("tbody");
      tblBody.id = "tbl-body";
      $("tbl").appendChild(tblBody);
      ids = [];
      heightStuff(data.list.map((row) => Number(row.height)));
      sort = data.list.sort((a, b) => a.id - b.id);

      for (const row of data.list) {
        let element = document.createElement("tr");
        element.id = "row-" + row.id;

        let id = document.createElement("td");
        id.className = classes;
        id.innerHTML = row.id;
        element.appendChild(id);

        let name = document.createElement("td");
        name.className = classes;
        let nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.className = "rounded";
        nameInput.id = "name-" + row.id;
        nameInput.value = row.name;
        nameInput.onkeyup = function () {
          _validateInput(nameInput.id);
        };
        name.appendChild(nameInput);
        element.appendChild(name);

        let height = document.createElement("td");
        height.className = classes;
        let heightInput = document.createElement("input");
        heightInput.type = "number";
        heightInput.className = "rounded";
        heightInput.id = "height-" + row.id;
        heightInput.value = row.height;
        heightInput.onkeyup = function () {
          _validateInput(heightInput.id);
        };
        height.appendChild(heightInput);
        element.appendChild(height);

        let weight = document.createElement("td");
        weight.className = classes;
        let weightInput = document.createElement("input");
        weightInput.type = "number";
        weightInput.className = "rounded";
        weightInput.id = "weight-" + row.id;
        weightInput.value = row.weight;
        weightInput.onkeyup = function () {
          _validateInput(weightInput.id);
        };
        weight.appendChild(weightInput);
        element.appendChild(weight);

        let update = document.createElement("td");
        update.className = classes;
        let updateLink = document.createElement("a");
        updateLink.innerHTML = "Frissítés";
        updateLink.className = "ptr";
        updateLink.onclick = function () {
          _edit(row.id);
        };
        update.appendChild(updateLink);
        element.appendChild(update);

        let deleteTd = document.createElement("td");
        deleteTd.className = classes;
        let deleteLink = document.createElement("a");
        deleteLink.innerHTML = "Törlés";
        deleteLink.className = "ptr";
        deleteLink.onclick = function () {
          _del(row.id);
        };
        deleteTd.appendChild(deleteLink);
        element.appendChild(deleteTd);

        $("tbl-body").appendChild(element);
        ids.push(row.id);
      }
      appendInsertRow();
    });
}

async function _del(id) {
  setStatus("Törlés...");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: "op=delete&code=" + $("code").value + "&id=" + id,
  })
    .then((data) => {
      if (!data.ok) {
        console.log("error");
        setStatus("Hiba", true);
        return;
      }
      read();
    })
    .catch((error) => {
      console.log(error);
      setStatus("Hiba", true);
    });
}

async function _edit(id) {
  setStatus("Szerkesztés...");
  if (
    !(
      _validateInput("name-" + id) &&
      _validateInput("height-" + id) &&
      _validateInput("weight-" + id)
    )
  ) {
    console.log("error");
    setStatus("Hiba", true);
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body:
      "op=update&code=" +
      $("code").value +
      "&height=" +
      $("height-" + id).value +
      "&weight=" +
      $("weight-" + id).value +
      "&name=" +
      $("name-" + id).value +
      "&id=" +
      id,
  })
    .then((data) => {
      if (!data.ok) {
        console.log("error");
        setStatus("Hiba", true);
        return;
      }
      return data.text();
    })
    .then((data) => {
      if (Number(data) === 0) {
        console.log("error");
        setStatus("Hiba", true);
        return;
      }
      read();
    })
    .catch((error) => {
      setStatus("Hiba", true);
      console.log(error);
    });
}

async function _add() {
  setStatus("Hozzáadás...");
  if (
    !(
      _validateInput("name") &&
      _validateInput("height") &&
      _validateInput("weight")
    )
  ) {
    console.log("error");
    setStatus("Hiba", true);
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body:
      "op=create&code=" +
      $("code").value +
      "&height=" +
      $("height").value +
      "&weight=" +
      $("weight").value +
      "&name=" +
      $("name").value,
  })
    .then((data) => {
      if (!data.ok) {
        console.log("error");
        setStatus("Hiba", true);
        return;
      }
      return data.text();
    })
    .then((data) => {
      if (Number(data) === 0) {
        console.log("error");
        setStatus("Hiba", true);
        return;
      }
      read();
    })
    .catch((error) => {
      setStatus("Hiba", true);
      console.log(error);
    });
}

function appendInsertRow() {
  if ($("insertRow") !== null) {
    return;
  }

  let tr = document.createElement("tr");
  tr.id = "insertRow";

  let id = document.createElement("td");
  id.className = classes;
  id.innerHTML = "Id";
  tr.appendChild(id);

  let name = document.createElement("td");
  name.className = classes;
  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "rounded";
  nameInput.id = "name";
  nameInput.placeholder = "Név";
  nameInput.onkeyup = function () {
    _validateInput(nameInput.id);
  };
  name.appendChild(nameInput);
  tr.appendChild(name);

  let height = document.createElement("td");
  height.className = classes;
  let heightInput = document.createElement("input");
  heightInput.type = "number";
  heightInput.className = "rounded";
  heightInput.id = "height";
  heightInput.placeholder = "Magasság";
  heightInput.onkeyup = function () {
    _validateInput(heightInput.id);
  };

  height.appendChild(heightInput);
  tr.appendChild(height);
  let weight = document.createElement("td");
  weight.className = classes;
  let weightInput = document.createElement("input");
  weightInput.type = "number";
  weightInput.className = "rounded";
  weightInput.id = "weight";
  weightInput.placeholder = "Súly";
  weightInput.onkeyup = function () {
    _validateInput(weightInput.id);
  };
  weight.appendChild(weightInput);
  tr.appendChild(weight);

  let add = document.createElement("td");
  add.className = classes;
  let addLink = document.createElement("a");
  addLink.innerHTML = "Hozzáadás";
  addLink.className = "ptr";
  addLink.onclick = function () {
    _add();
  };
  add.appendChild(addLink);
  tr.appendChild(add);
  $("tbl-body").appendChild(tr);
  setStatus("Sorok száma: " + ids.length);
}

function removeInsertRow() {
  $("insertRow").remove();
}
