const url =
  "https://cors-anywhere.herokuapp.com/https://www.bloomberght.com/piyasa/intradaydata/dolar";
const loading = document.querySelector(".loading");
const table = document.querySelector("table");

let apiData = [];
let isApiResponded = false;

fetchData();

function fetchData() {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      apiData = res["SeriesData"].slice(-10);
      isApiResponded = true;
    })
    .then(() => generateDateAndTime(apiData))
    .then(() => {
      if (apiData.length !== 0 && isApiResponded) {
        generateTable(table, apiData);
      }
      isApiResponded = false;
    })
    .then(() => loading.classList.add("hidden"))
    .then(() => table.classList.remove("hidden"))
    .catch(err => console.log(err));
}

function generateTable(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  let headers = ["Date and Time", "Dollar Rate"];
  headers.map(key => {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  });

  data.map(eachData => {
    let row = table.insertRow();
    eachData.map(el => {
      let cell = row.insertCell();
      let text = document.createTextNode(el);
      cell.appendChild(text);
    });
  });
}

function generateDateAndTime(array) {
  array.map(data => {
    let date = new Date(data[0]).toLocaleDateString("tr-TR");
    let time = new Date(data[0])
      .toLocaleTimeString("tr-TR")
      .toString()
      .slice(0, -3);
    return (data[0] = `${date} ${time}`);
  });
}

function updateButton() {
  document.querySelector("thead").remove();
  table.classList.add("hidden");
  loading.classList.remove("hidden");
  fetchData();
}
