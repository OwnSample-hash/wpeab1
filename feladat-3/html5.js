function storeUserString() {
  let userString = document.getElementById("userString").value;
  localStorage.setItem("userString", userString);
  sessionStorage.setItem("userString", userString);
  document.getElementById("storedData").innerText = "Stored: " + userString;
}

if (window.Worker) {
  const worker = new Worker(
    URL.createObjectURL(
      new Blob(
        [
          `
        self.onmessage = function(event) {
            self.postMessage('Worker processed: ' + event.data);
        };
    `,
        ],
        { type: "application/javascript" }
      )
    )
  );
  worker.onmessage = function (event) {
    console.log(event.data);
  };
  worker.postMessage(localStorage.getItem("userString"));
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      document.getElementById(
        "locationData"
      ).innerText = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
    });
  }
}

let dropZone = document.getElementById("dropZone");
let dragText = document.getElementById("dropText");
dragText.ondragstart = (event) =>
  event.dataTransfer.setData("text", event.target.id);
dropZone.ondragover = (event) => event.preventDefault();
dropZone.ondrop = (event) => {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  dropZone.innerText = "Dropped: " + data;
};

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mousemove", draw);

function draw(event) {
  if (!drawing) return;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const source = new EventSource("/feladat-3/stream.php");

source.onmessage = function (event) {
  const data = JSON.parse(event.data);
  document.getElementById("time").textContent = data.time;
};

source.onerror = function (err) {
  console.error("EventSource failed:", err);
};
