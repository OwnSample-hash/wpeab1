const url = "http://gamf.nhely.hu/ajax2/";

function $(id) {
  return document.getElementById(id);
}

ids = [];

function removeRow(id) {
  $("row-" + id).remove();
}

async function read() {
  $("status").innerHTML = "Reading...";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: "op=read&code=" + $("code").value,
  })
    .then((data) => data.text())
    .then((data) => {
      data = JSON.parse(data);
      removeInsertRow();
      $("tbl").innerHTML = `<tr>
        <th class="text py-2 px-2">Id</th>
        <th class="text py-2 px-2">Name</th>
        <th class="text py-2 px-2">Height</th>
        <th class="text py-2 px-2">Weight</th>
        <th class="text py-2 px-2">Edit</th>
        <th class="text py-2 px-2">Delete</th>
      </tr>`;
      ids = [];
      for (const row of data.list) {
        $("tbl").innerHTML += `<tr id="row-${row.id}">
          <td class="text py-2 px-2">${row.id}</td>
          <td class="text py-2 px-2"><input id="name-${row.id}" value="${row.name}"/></td>
          <td class="text py-2 px-2"><input id="height-${row.id}" value="${row.height}"/></td>
          <td class="text py-2 px-2"><input id="weight-${row.id}" value="${row.weight}"/></td>
          <td class="text py-2 px-2"><a onclick="edit(${row.id})" class="ptr">Edit</a></td>
          <td class="text py-2 px-2"><a onclick="del(${row.id})" class="ptr">Delete</a></td>
        </tr>`;
        ids.push(row.id);
      }
      appendInsertRow();
    });
}

async function del(id) {
  $("status").innerHTML = "Deleting...";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: "op=delete&code=" + $("code").value + "&id=" + id,
  }).then((_) => {
    $("row-" + id).remove();
  })
    .catch((error) => {
      console.log(error);
    });
}

async function edit(id) {
  $("status").innerHTML = "Editing...";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: "op=update&code=" + $("code").value + "&height=" +
      $("height-" + id).value +
      "&weight=" + $("weight-" + id).value + "&name=" + $("name-" + id).value +
      "&id=" + id,
  }).then((data) => data.text())
    .then((data) => {
      if (Number(data) === 0) {
        console.log("error");
        return;
      }
      read();
    }).catch((error) => {
      console.log(error);
    });
}

async function add() {
  $("status").innerHTML = "Adding...";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: "op=create&code=" + $("code").value + "&height=" + $("height").value +
      "&weight=" + $("weight").value,
  }).then((_) => {
    //TODO: add new row
  }).catch((error) => {
    console.log(error);
  });
}

function appendInsertRow() {
  $("tbl").innerHTML += `<tr id="insertRow">
      <td class="text py-2 px-2">Id</td>
      <td class="text py-2 px-2"><input id="name" placeholder="Fgh"/></td>
      <td class="text py-2 px-2"><input id="height" placeholder="12"/></td>
      <td class="text py-2 px-2"><input id="weight" placeholder="21"/></td>
      <td class="text py-2 px-2" colspan="2"><a onclick="add()" class="ptr">Add</a></td>
  </tr>`;
  $("status").innerHTML = "Number of rows: " + ids.length;
}

function removeInsertRow() {
  $("insertRow").remove();
}

//Vim: set expandtab tabstop=2 shiftwidth=2:
