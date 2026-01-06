// Lista de destinos con todos los datos
let destinos = [
  { ciudad: "Barcelona", continente: "Europa", pais: "España", dias: 4, transporte: "Tren", costeTransporte: 60, alojamiento: "Hotel", costeAlojamiento: 90, lat: 41.39, lon: 2.17, lugares: "Sagrada Familia, Park Güell, La Rambla" },
  { ciudad: "Marrakech", continente: "África", pais: "Marruecos", dias: 3, transporte: "Avión", costeTransporte: 100, alojamiento: "Riad", costeAlojamiento: 70, lat: 31.63, lon: -7.98, lugares: "Zocos, Plaza Jemaa el-Fna" },
  { ciudad: "Chongqing", continente: "Asia", pais: "China", dias: 5, transporte: "Avión", costeTransporte: 800, alojamiento: "Hotel", costeAlojamiento: 90, lat: 29.43, lon: 106.91, lugares: "Yangtze River Cableway, Ciqikou Old Town" },
  { ciudad: "Sídney", continente: "Oceanía", pais: "Australia", dias: 6, transporte: "Avión", costeTransporte: 400, alojamiento: "Hostel", costeAlojamiento: 80, lat: -33.87, lon: 151.21, lugares: "Ópera de Sídney, Bondi Beach" },
  { ciudad: "Nueva York", continente: "América", pais: "EE. UU.", dias: 4, transporte: "Avión", costeTransporte: 1800, alojamiento: "Hotel", costeAlojamiento: 150, lat: 40.71, lon: -74.01, lugares: "Times Square, Central Park" }
];

const tablaBody = document.querySelector("#tablaDestinos tbody");
const totalCosteP = document.getElementById("totalCoste");

// Función para actualizar la tabla y calcular coste total
function actualizarTabla() {
  tablaBody.innerHTML = "";
  let total = 0;

  destinos.forEach(destino => {
    total += destino.costeTransporte + (destino.dias * destino.costeAlojamiento);

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${destino.ciudad}</td>
      <td>${destino.continente}</td>
      <td>${destino.pais}</td>
      <td>${destino.dias}</td>
      <td>${destino.transporte}</td>
      <td>${destino.costeTransporte}</td>
      <td>${destino.alojamiento}</td>
      <td>${destino.costeAlojamiento}</td>
      <td>${destino.lugares}</td>
    `;
    tablaBody.appendChild(fila);
  });

  totalCosteP.textContent = `Coste total: ${total} €`;
}

// Inicializar tabla al cargar
actualizarTabla();

// ---------------- Mapa con Leaflet ----------------
let map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

let marcadores = [];
let polyline = null;

function actualizarMapa() {
  marcadores.forEach(m => map.removeLayer(m));
  marcadores = [];
  if (polyline) map.removeLayer(polyline);

  let coords = [];
  destinos.forEach(destino => {
    const m = L.marker([destino.lat, destino.lon]).addTo(map).bindPopup(destino.ciudad);
    marcadores.push(m);
    coords.push([destino.lat, destino.lon]);
  });

  if (coords.length > 1) {
    polyline = L.polyline(coords, {color: 'blue'}).addTo(map);
    map.fitBounds(polyline.getBounds());
  } else if (coords.length === 1) {
    map.setView(coords[0], 4);
  }
}

// Inicializar mapa al cargar
actualizarMapa();
