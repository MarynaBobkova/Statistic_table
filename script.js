var title = document.getElementById("title");

// function showHide() {
//   if (title.style.display != 'block') { // если блок скрыт
//     title.style.display = 'block'; // открываем его
//   } else { // если открыт
//     title.style.display = 'none'; // скрываем
//   }
// }

// URL, откуда нужно загрузить JSON
const urls = [
  "http://us.sfg3.forge-games.com:9015",
  "http://br.sfg3.forge-games.com:9015",
  "http://eu.sfg3.forge-games.com:9015",
  "http://as.sfg3.forge-games.com:9015",
  "http://us2.sfg3.forge-games.com:9015",
  "http://ru.sfg3.forge-games.com:9015",
  "http://test.sfg3.forge-games.com:9015",
];

// For sorting ascending or descending
const flag = { Port: false, GameMode: false };
let data = [];
let servers = 0;

selectServer();
// Используем fetch для загрузки данных

function selectServer() {
  let select = document.getElementById("serverSelect");
  let selectedValue = select.options[select.selectedIndex].value;

  // Определяем индекс выбранного сервера
  let index = parseInt(selectedValue.replace("Server ", "")) - 1;

  // Загружаем данные с выбранного сервера
  fetch(urls[index])
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((parsedJson) => {
      // Очищаем таблицу перед обновлением
      remove();

      const servers = parsedJson.Servers;
      const totalCCUCurrent = parsedJson.TotalCCUCurrent;
      const totalCCUMax = parsedJson.TotalCCUMax;
      const hubCCUCurrent = parsedJson.HubCCUCurrent;
      const hubCCUMax = parsedJson.HubCCUMax;
      const hubUsagePercent = parsedJson.HubUsagePercent;
      const serverKBytes = parsedJson.ServerKBytes;
      const clientKBytes = parsedJson.ClientKBytes;

      // Найдем блок <h2> по его id и вставим в него значения
      const h4Element = document.getElementById("totalCCUHeader");
      h4Element.innerHTML = `Servers: ${servers}<br>
      Total CCU Current: ${totalCCUCurrent}<br>
      Total CCU Max: ${totalCCUMax}<br>
      Hub CCU Current: ${hubCCUCurrent}<br>
      Hub CCU Max: ${hubCCUMax}<br>
      Hub Usage Percent: ${hubUsagePercent}<br>
      Server KBytes: ${serverKBytes}<br>
      Client KBytes: ${clientKBytes}<br>`;
      // Обновляем данные и таблицу
      data = parsedJson.ServerList;
      data.forEach((e, i) => addItem(e, i));
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// // For edit item
// let index = -1;
const table = document.getElementById("table");

// To create table
function addItem(e, i) {
  row = table.insertRow(i + 1);
  let c0 = row.insertCell(0);
  let c1 = row.insertCell(1);
  let c2 = row.insertCell(2);
  let c3 = row.insertCell(3);
  let c4 = row.insertCell(4);
  let c5 = row.insertCell(5);
  let c6 = row.insertCell(6);
  let c7 = row.insertCell(7);
  let c8 = row.insertCell(8);
  let c9 = row.insertCell(9);
  let c10 = row.insertCell(10);
  let c11 = row.insertCell(11);
  let c12 = row.insertCell(12);
  let c13 = row.insertCell(13);
  let c14 = row.insertCell(14);
  let c15 = row.insertCell(15);
  let c16 = row.insertCell(16);
  c0.innerText = i + 1;
  c1.innerText = e.Ip;
  c2.innerText = e.Port;
  c3.innerText = e.PortSocket;
  c4.innerHTML = e.ServerVersion;
  c5.innerHTML = e.ServerName;
  c6.innerText = e.Map;
  c7.innerText = e.CurrentPlayers;
  c8.innerText = e.MaxPlayers;
  c9.innerText = e.GameMode;
  c10.innerText = e.Dedicated;
  c11.innerText = e.ClanId;
  c12.innerText = e.FriendsCanJoin;
  c13.innerText = e.bUseNetHub;
  c14.innerText = e.IsExpired;
  c15.innerText = e.ServerQuit;
  c16.innerText = e.IsFull;
}

// For sorting in different cases
function sortItems(title) {
  remove();
  switch (title) {
    case "ip":
      sortIp();
      break;
    case "port":
      sortPort();
      break;
    case "portSocket":
      sortPortSocket();
      break;
    case "serverVersion":
      sortServerVersion();
      break;
    case "serverName":
      sortServerName();
      break;
    case "map":
      sortMap();
      break;
    case "currentPlayers":
      sortCurrentPlayers();
      break;
    case "maxPlayers":
      sortMaxPlayers();
      break;
    case "gameMode":
      sortGameMode();
      break;
    case "clanId":
      sortClanId();
      break;
    default:
      console.log("Default");
  }
  data.map((e, i) => addItem(e, i));
}
// Обработчик события клика на заголовках столбцов для сортировки данных
document.querySelectorAll('#tableHeader th').forEach(header => {
  header.addEventListener('click', function() {
      const sortField = this.getAttribute('data-sort');
      sortItems(sortField);
  });
});

// Clear the table before updation
function remove() {
  console.log("removed");
  while (table.rows.length > 1) table.deleteRow(-1);
}

// Sort
function sortGameMode() {
  data.sort((a, b) => {
    let fa = a.GameMode.toLowerCase(),
      fb = b.GameMode.toLowerCase();
    console.log(fa, fb);

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  if (flag.GameMode) data.reverse();
  flag.GameMode = !flag.GameMode;
}
function sortServerName() {
  data.sort((a, b) => {
    let fa = a.ServerName.toLowerCase(),
      fb = b.ServerName.toLowerCase();
    console.log(fa, fb);

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  if (flag.ServerName) data.reverse();
  flag.ServerName = !flag.ServerName;
}
function sortMap() {
  data.sort((a, b) => {
    let fa = a.Map.toLowerCase(),
      fb = b.Map.toLowerCase();
    console.log(fa, fb);

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  if (flag.Map) data.reverse();
  flag.Map = !flag.Map;
}

function sortIp() {
  data.sort((a, b) => a.Ip - b.Ip);
  if (flag.Ip) data.reverse();
  flag.Ip = !flag.Ip;
}

function sortPort() {
  data.sort((a, b) => a.Port - b.Port);
  if (flag.Port) data.reverse();
  flag.Port = !flag.Port;
}
function sortPortSocket() {
  data.sort((a, b) => a.PortSocket - b.PortSocket);
  if (flag.PortSocket) data.reverse();
  flag.PortSocket = !flag.PortSocket;
}
function sortServerVersion() {
  data.sort((a, b) => a.ServerVersion - b.ServerVersion);
  if (flag.ServerVersion) data.reverse();
  flag.ServerVersion = !flag.ServerVersion;
}
function sortCurrentPlayers() {
  data.sort((a, b) => a.CurrentPlayers - b.CurrentPlayers);
  if (flag.CurrentPlayers) data.reverse();
  flag.CurrentPlayers = !flag.CurrentPlayers;
}
function sortMaxPlayers() {
  data.sort((a, b) => a.MaxPlayers - b.MaxPlayers);
  if (flag.MaxPlayers) data.reverse();
  flag.MaxPlayers = !flag.MaxPlayers;
}
function sortClanId() {
  data.sort((a, b) => a.ClanId - b.ClanId);
  if (flag.ClanId) data.reverse();
  flag.ClanId = !flag.ClanId;
}

// To search and filter items
function searchItems() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let filterItems = data.filter((e) => {
    return (
      e.ServerName.toLowerCase().includes(input) ||
      e.GameMode.toLowerCase().includes(input) ||
      e.Map.toLowerCase().includes(input) ||
      e.Port.includes(input) ||
      e.PortSocket.includes(input) ||
      e.Ip.includes(input) ||
      e.MaxPlayers.includes(input) ||
      e.CurrentPlayers.includes(input) ||
      e.ClanId.includes(input)
    );
  });

  remove();
  filterItems.map((e, i) => addItem(e, i));
}
