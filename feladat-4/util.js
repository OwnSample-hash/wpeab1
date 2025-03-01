function $(id) {
  return (id === "" ? null : document.getElementById(id));
}

nums = [];
ch = null;

function onRowClick(row) {
  if (ch) {
    ch.destroy();
  }
  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.bg || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };
  ch = new Chart($("chart"), {
    type: "line",
    data: {
      labels: nums[row].map((_, i) => i + 1),
      datasets: [{
        label: "Row " + (row + 1),
        data: nums[row],
        borderColor: "blue",
        fill: false,
      }]
    },
    options: {
      plugins: {
        customCanvasBackgroundColor: {
          bg: "#1c1c1c"
        }
      }
    },
    plugins: [plugin]
  });
}

function onload() {
  Chart.defaults.color = "#ccc";
  Chart.defaults.borderColor = "#6c6c6c";
  row = [];
  for (let i = 1; i < 26; i++) {
    row.push(Math.random() * 100);
    if (i % 5 === 0) {
      1
      nums.push(row);
      row = [];
    }
  }
  $("tbl").innerHTML = nums.map((row, i) => `<tr class="tr" id="row-${i}">${row.map((num, j) => `<td id="cell-${i}-${j}" class="text" onclick="onRowClick(${i})">${num.toFixed(2)}</td>`).join("")}</tr>`).join("");
}
