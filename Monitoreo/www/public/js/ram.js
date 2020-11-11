const socket = io();

const graph = document.getElementById("graph");
const totalDiv = document.getElementById("total");
const usedDiv = document.getElementById("used");
const usedPercentDiv = document.getElementById("usedPercent");

Plotly.plot(
  graph,
  [
    {
      x: [new Date()],
      y: [0],
      mode: "lines+markers",
      name: "RAM consumida (MB)",
      marker: { color: "#80CAF6", size: 8 },
      line: { width: 4 },
    },
  ],
  {
    xaxis: {
      range: [0, 50],
    },
    yaxis: {
      title: "Uso de memoria (MB)",
      showticklabels: true,
      tickangle: 45,
      tickfont: {
        family: "Old Standard TT, serif",
        size: 14,
        color: "black",
      },
    },
  }
);

socket.on("ram-used", (consumed) => {
  usedDiv.innerText = consumed.total;
  usedPercentDiv.innerText = consumed.percent;

  const time = new Date();
  const total = parseInt(consumed.total, 10);

  const update = {
    x: [[time]],
    y: [[total]],
  };

  const olderTime = time.setMinutes(time.getMinutes() - 1);
  const futureTime = time.setMinutes(time.getMinutes() + 1);

  const minuteView = {
    xaxis: {
      type: "date",
      range: [olderTime, futureTime],
    },
  };

  Plotly.relayout(graph, minuteView);
  Plotly.extendTraces(graph, update, [0]);
});

socket.on("ram-total", (total) => {
  totalDiv.innerText = total;
});

setTimeout(() => {
  socket.emit("ram-total");
}, 500);

setInterval(() => {
  socket.emit("ram-used");
}, 3000);
