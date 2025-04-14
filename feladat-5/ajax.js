// const url = "http://gamf.nhely.hu/ajax2/";
const url = "/proxy/";

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
    return;
  }
  $(fieldId).classList.remove("br-red");
  console.log("pass ", fieldId);
}

function heightStuff(heights) {
  $("height-sum").innerHTML = ((arr) =>
    arr.reduce((acc, curr) => acc + curr, 0))(heights);
  $("height-avg").innerHTML = ((arr) =>
    arr.reduce((acc, curr) => acc + curr, 0) / arr.length)(heights).toFixed(2);
  $("height-max").innerHTML = Math.max(...heights);
}

async function read() {
  setStatus("Reading...");
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
      $("tbl").innerHTML = `<tr>
        <th class="text py-2 px-2">Id</th>
        <th class="text py-2 px-2">Name</th>
        <th class="text py-2 px-2">Height</th>
        <th class="text py-2 px-2">Weight</th>
        <th class="text py-2 px-2">Update</th>
        <th class="text py-2 px-2">Delete</th>
      </tr>`;
      ids = [];
      heightStuff(data.list.map((row) => Number(row.height)));
      sort = data.list.sort((a, b) => a.id - b.id);
      for (const row of data.list) {
        $("tbl").innerHTML += `<tr id="row-${row.id}">
          <td class="text py-2 px-2">${row.id}</td>
          <td class="text py-2 px-2"><input type="text" onKeyUp="_validateInput('name-${row.id}')" class="rounded" id="name-${row.id}" value="${row.name}"/></td>
          <td class="text py-2 px-2"><input type="text" onKeyUp="_validateInput('height-${row.id}')" class="rounded" id="height-${row.id}" value="${row.height}"/></td>
          <td class="text py-2 px-2"><input type="text" onKeyUp="_validateInput('weight-${row.id}')" class="rounded" id="weight-${row.id}" value="${row.weight}"/></td>
          <td class="text py-2 px-2"><a onclick="_edit(${row.id})" class="ptr">Update</a></td>
          <td class="text py-2 px-2"><a onclick="_del(${row.id})" class="ptr">Delete</a></td>
        </tr>`;
        ids.push(row.id);
      }
      appendInsertRow();
    });
}

async function _del(id) {
  setStatus("Deleting...");
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
        setStatus("Error", true);
        return;
      }
      read();
    })
    .catch((error) => {
      console.log(error);
      setStatus("Error", true);
    });
}

async function _edit(id) {
  setStatus("Editing...");
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
        setStatus("Error", true);
        return;
      }
      return data.text();
    })
    .then((data) => {
      if (Number(data) === 0) {
        console.log("error");
        setStatus("Error", true);
        return;
      }
      read();
    })
    .catch((error) => {
      setStatus("Error", true);
      console.log(error);
    });
}

async function _add() {
  setStatus("Adding...");
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
        setStatus("Error", true);
        return;
      }
      return data.text();
    })
    .then((data) => {
      if (Number(data) === 0) {
        console.log("error");
        setStatus("Error", true);
        return;
      }
      read();
    })
    .catch((error) => {
      setStatus("Error", true);
      console.log(error);
    });
}

function appendInsertRow() {
  $("tbl").innerHTML += `<tr id="insertRow">
      <td class="text py-2 px-2">Id</td>
      <td class="text py-2 px-2"><input onKeyUp="_validateInput('name')" class="rounded" id="name" placeholder="Fgh"/></td>
      <td class="text py-2 px-2"><input onKeyUp="_validateInput('height')" class="rounded" id="height" placeholder="12"/></td>
      <td class="text py-2 px-2"><input onKeyUp="_validateInput('weight')" class="rounded" id="weight" placeholder="21"/></td>
      <td class="text py-2 px-2" colspan="2"><a onclick="_add()" class="ptr">Add</a></td>
  </tr>`;
  setStatus("Number of rows: " + ids.length);
}

function removeInsertRow() {
  $("insertRow").remove();
}
