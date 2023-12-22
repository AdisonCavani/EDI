const request = fetch("https://my.api.mockaroo.com/data.json?key=937009f0")
  .then((response) => response.json())
  .then((data) => {
    const table = document.getElementById("table");

    data.forEach((item) => {
      const tr = document.createElement("tr");
      table.appendChild(tr);

      for (const [_, value] of Object.entries(item)) {
        const td = document.createElement("td");
        td.textContent = value;

        tr.appendChild(td);
      }
    });

    const labels = [];
    const gdp_array = [];
    const area_array = [];

    data.forEach((item, index) => {
      labels[index] = item.country;
      gdp_array[index] = item.gdp_per_capita;
      area_array[index] = item.area;
    });

    const bar_chart = document.getElementById("bar-chart");
    const pie_chart = document.getElementById("pie-chart");

    new Chart(bar_chart, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "GDP per capita",
            data: gdp_array,
          },
        ],
      },
    });

    new Chart(pie_chart, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Area of the country",
            data: area_array,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
