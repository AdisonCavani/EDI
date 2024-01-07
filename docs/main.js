// Używamy fetch API, aby pobrać dane z mockaroo.com
// Dokumentacja mozilla: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const request = fetch("https://my.api.mockaroo.com/data.json?key=937009f0")
  // ".them()" używamy gdy funkcja jest asynchroniczna, czyli jest zależna od sieci internetowej, prędkości odczytu lub zapisu
  // musimy więc zaczekać dłuższy czas na jej wykonanie
  // można to poznać jeżeli funkcja po najechaniu kursorem zwraca nam "Promise<>"
  .then((response) => response.json()) // Zmieniamy tekst (string) na objekt JavaScript
  .then((data) => {
    // #REGION -- Tworzenie tabeli -- #REGION

    const table = document.getElementById("table");

    // Iteracja pętlą "for" po tablicy 100 elementowej
    data.forEach((item) => {
      // Tworzymy nowy wiersz
      const tr = document.createElement("tr");

      // Dodajemy go do drzewa DOM
      table.appendChild(tr);

      // Pętla "for" dla każdej wartości obiektu
      // Object.entries() rozbija nasz "object" na klucz i wartość
      for (const [key, value] of Object.entries(item)) {
        // Tworzymy nowe pole
        const td = document.createElement("td");
        td.textContent = value; // Dodajemy tekst to konkretnego pola

        // Dodajemy nasze pole do wiersza
        tr.appendChild(td);
      }
    });

    // #REGION -- Tworzenie danych do wykresu -- #REGION

    // Tworzymy 3 puste tablice, które później wykorzystamy
    const labels = [];
    const gdp_array = [];
    const area_array = [];

    // Usuwamy zduplikowane państwa, aby nie wyświetlały się w wykresie
    // https://fullstackheroes.com/tutorials/javascript/5-ways-to-remove-duplicate-objects-from-array-based-on-property/
    data
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.country === value.country)
      )
      // Iteracja pętlą "for" po tablicy 100 elementowej
      .forEach((item, index) => {
        labels[index] = item.country; // Dodajemy nazwę państwa do tablicy "labels"
        gdp_array[index] = item.gdp_per_capita; // Dodajemy wartość PKB na 1 mieszkańca do tablicy "gdp_array"
        area_array[index] = item.area; // Dodajemy wartość powierzchni danego kraju do tablicy "area_array"
      });

    // #REGION -- Tworzenie wykresów -- #REGION

    const bar_chart = document.getElementById("bar-chart");
    const pie_chart = document.getElementById("pie-chart");

    // Tworzymy wykres nr 1
    // "Chart()" ma dwa parametry.
    // Pierwszy to element HTML z drzewa DOM, czyli miejsce gdzie ma być nasz wykres renderowany
    // Drugi to opcje, czyli obiekt z właściwościami, np. typ, dane itp.
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

    // Tworzymy wykres nr 2
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
    });
  });
