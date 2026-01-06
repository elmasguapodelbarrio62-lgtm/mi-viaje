// Datos iniciales de los destinos
let destinos = [
    { ciudad: "Barcelona", continente: "Europa", dias: 4, transporte: "Tren", coste: 60, lat: 41.39, lon: 2.17 },
    { ciudad: "Marrakech", continente: "África", dias: 3, transporte: "Avión", coste: 100, lat: 31.63, lon: -7.98 },
    { ciudad: "Chongqing", continente: "Asia", dias: 5, transporte: "Avión", coste: 800, lat: 29.43, lon: 106.91 },
    { ciudad: "Sídney", continente: "Oceanía", dias: 6, transporte: "Avión", coste: 400, lat: -33.87, lon: 151.21 },
    { ciudad: "Nueva York", continente: "América", dias: 4, transporte: "Avión", coste: 1800, lat: 40.71, lon: -74.01 }
];

// Función para renderizar la tabla
function renderTabla() {
    const tbody = document.getElementById('tabla-destinos');
    tbody.innerHTML = '';
    let total = 0;

    destinos.forEach((destino, index) => {
        total += destino.coste;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${destino.ciudad}</td>
            <td>${destino.continente}</td>
            <td>${destino.dias}</td>
            <td>${destino.transporte}</td>
            <td>${destino.coste}</td>
            <td><button onclick="eliminarDestino(${index})">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('coste-total').textContent = `Coste total aproximado: €${total}`;
}

// Función para eliminar destino
function eliminarDestino(index) {
    destinos.splice(index, 1);
    renderTabla();
    renderMapa();
}

// Inicializar mapa
let map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function renderMapa() {
    if (window.markers) window.markers.forEach(m => map.removeLayer(m));
    if (window.polyline) map.removeLayer(window.polyline);

    window.markers = [];
    const latlngs = [];

    destinos.forEach(destino => {
        const marker = L.marker([destino.lat, destino.lon]).addTo(map)
            .bindPopup(`${destino.ciudad} (${destino.continente})`);
        window.markers.push(marker);
        latlngs.push([destino.lat, destino.lon]);
    });

    if (latlngs.length > 1) {
        window.polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);
        map.fitBounds(window.polyline.getBounds());
    }
}

// Inicializar todo
renderTabla();
renderMapa();

