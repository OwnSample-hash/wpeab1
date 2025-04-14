function $(ID) {
  return ID === "" ? undefined : document.getElementById(ID);
}

adatok = [
  { nev: "Gábor", kor: "18", magassag: "190" },
  { nev: "Máté", kor: "25", magassag: "150" },
  { nev: "Tamás", kor: "45", magassag: "167" },
  { nev: "István", kor: "12", magassag: "130" },
  { nev: "Gergő", kor: "16", magassag: "185" },
];

function InputValidation(fieldId) {
  if ($(fieldId).type === "number") {
    if (
      $(fieldId).value === "" &&
      (Number($(fieldId).value) <= 0 || Number($(fieldId).value) > 200)
    ) {
      $(fieldId).classList.add("br-red");
      console.log("error for ", fieldId);
      return false;
    }
  } else if ($(fieldId).type === "text") {
    if ($(fieldId).value === "") {
      $(fieldId).classList.add("br-red");
      console.log("error for ", fieldId);
      return false;
    }
  }
  $(fieldId).classList.remove("br-red");
  console.log("pass ", fieldId);
  return true;
}

function Add() {
  if (
    InputValidation("nev") &&
    InputValidation("kor") &&
    InputValidation("magassag")
  ) {
    adatok.push({
      nev: $("nev").value,
      kor: $("kor").value,
      magassag: $("magassag").value,
    });
    addtotable();
  }
}

function addtotable() {
  $("tbl").innerHTML = `
    <thead>
    <tr>
      <th onclick="sortTable('id')">Index</th>
      <th onclick="sortTable('nev')">Név</th>
      <th onclick="sortTable('kor')">Kor</th>
      <th onclick="sortTable('magassag')">Magasság</th>
    </tr>
    </thead>
    <tbody>`;
  $("tbl").innerHTML += adatok
    .map((element, i) => {
      return `<tr>
              <td>${i}</td>
              <td>${element.nev}</td>
              <td>${element.kor}</td>
              <td>${element.magassag}</td>
            </tr>`;
    })
    .join("");
    $("tbl").innerHTML+='</tbody>';
}

function del() {
  adatok = adatok.filter((_, i) => i !== Number($("tor").value));
  addtotable();
}

function update() {
  if (
    InputValidation("nevv") &&
    InputValidation("korr") &&
    InputValidation("magassagg")
  ) {
    adatok = adatok.map((e, i) => {
      if (i === Number($("IDD").value)) {
        return {
          nev: $("nevv").value,
          kor: $("korr").value,
          magassag: $("magassagg").value,
        };
      }
      return e;
    });
    addtotable();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  addtotable();
});

function sortTable(key) {
    let ascending = $("tbl").dataset.order === "asc" ? false : true;
    adatok.sort((a, b) => {
        let cellA = key === 'id' ? adatok.indexOf(a) : a[key];
        let cellB = key === 'id' ? adatok.indexOf(b) : b[key];
        
        if (!isNaN(cellA) && !isNaN(cellB)) {
            return ascending ? cellA - cellB : cellB - cellA;
        }
        return ascending ? cellA.toString().localeCompare(cellB.toString()) : cellB.toString().localeCompare(cellA.toString());
    });
    $("tbl").dataset.order = ascending ? "asc" : "desc";
    addtotable();
}

function filterTable() {
  let nevFilter = $("filter-nev").value.toLowerCase();
  let korFilter = $("filter-kor").value.toLowerCase();
  let magassagFilter = $("filter-magassag").value.toLowerCase();
  
  let filteredData = adatok.filter(e => 
    (e.nev.toLowerCase().includes(nevFilter)) &&
    (e.kor.toLowerCase().includes(korFilter)) &&
    (e.magassag.toLowerCase().includes(magassagFilter))
  );
  
  $("tbl").innerHTML = `
    <thead>
    <tr>
      <th onclick="sortTable('id')">Index</th>
      <th onclick="sortTable('nev')">Név</th>
      <th onclick="sortTable('kor')">Kor</th>
      <th onclick="sortTable('magassag')">Magasság</th>
    </tr>
    </thead
    <tbody>`;
  $("tbl").innerHTML += filteredData
    .map((element, i) => {
      return `<tr>
              <td>${i}</td>
              <td>${element.nev}</td>
              <td>${element.kor}</td>
              <td>${element.magassag}</td>
            </tr>`;
    })
    .join("");
    $("tbl").innerHTML+='</tbody>';
}