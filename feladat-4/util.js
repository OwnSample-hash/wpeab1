function $(id) {
  return id === "" ? null : document.getElementById(id);
}

nums = [];
ch = null;

const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.bg || "#99ffff";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

function onRowClick(row) {
  if (ch) {
    ch.destroy();
  }
  ch = new Chart($("chart"), {
    type: "line",
    data: {
      labels: nums[row].map((_, i) => i + 1),
      datasets: [
        {
          label: "Sor " + (row + 1),
          data: nums[row],
          borderColor: "#ccc",
          fill: false,
        },
      ],
    },
    options: {
      plugins: {
        customCanvasBackgroundColor: {
          bg: "#1c1c1c",
        },
      },
    },
    plugins: [plugin],
  });
  $("canvas").style.display = "";
}

function onload() {
  Chart.defaults.color = "#ccc";
  Chart.defaults.borderColor = "#6c6c6c";
  row = [];
  for (let i = 1; i < 26; i++) {
    row.push(Math.random() * 100);
    if (i % 5 === 0) {
      nums.push(row);
      row = [];
    }
  }
  $("tbl").innerHTML = nums
    .map(
      (row, i) =>
        `<tr class="tr" id="row-${i}">${row
          .map(
            (num, j) =>
              `<td id="cell-${i}-${j}" class="text" onclick="onRowClick(${i})">${num.toFixed(
                2
              )}</td>`
          )
          .join("")}</tr>`
    )
    .join("");
}
