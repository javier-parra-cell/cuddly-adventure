// Configuración inicial del mapa con Leaflet.js
const map = L.map('map').setView([4.5709, -74.2973], 5); // Coordenadas centradas en Colombia

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Datos de coordenadas y lugares turísticos por ciudad
const destinos = [
    {
        nombre: "Cartagena",
        descripcion: "Ciudad histórica con playas espectaculares.",
        coordenadas: [10.3910, -75.4794],
        lugares: [
            { nombre: "Castillo de San Felipe", coords: [10.4225, -75.5354] },
            { nombre: "Ciudad Amurallada", coords: [10.4260, -75.5480] }
        ]
    },
    {
        nombre: "Medellín",
        descripcion: "Conocida como la ciudad de la eterna primavera.",
        coordenadas: [6.2442, -75.5812],
        lugares: [
            { nombre: "Comuna 13", coords: [6.2569, -75.6075] },
            { nombre: "Parque Arví", coords: [6.2763, -75.5025] }
        ]
    },
    {
        nombre: "Bogotá",
        descripcion: "Capital cultural y vibrante.",
        coordenadas: [4.7110, -74.0721],
        lugares: [
            { nombre: "Monserrate", coords: [4.6054, -74.0610] },
            { nombre: "Museo del Oro", coords: [4.6019, -74.0716] }
        ]
    },
    {
        nombre: "San Andrés",
        descripcion: "Isla paradisíaca con mar de siete colores.",
        coordenadas: [12.5847, -81.7006],
        lugares: [
            { nombre: "Johnny Cay", coords: [12.5895, -81.6955] },
            { nombre: "Hoyo Soplador", coords: [12.5234, -81.7158] }
        ]
    }
];

// Manejar la búsqueda de destinos
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('search').value.toLowerCase();
    const destino = destinos.find(d => d.nombre.toLowerCase().includes(query));

    if (destino) {
        mostrarDestinos([destino]);
        centrarMapa(destino);
    } else {
        buscarCoordenadas(query);
    }
});

// Mostrar los destinos en la lista
function mostrarDestinos(resultados) {
    const lista = document.getElementById('destino-list');
    lista.innerHTML = "";

    resultados.forEach(destino => {
        const item = document.createElement('div');
        item.innerHTML = `<h3>${destino.nombre}</h3><p>${destino.descripcion}</p>`;
        lista.appendChild(item);
    });
}

// Centrar el mapa en la ciudad seleccionada y mostrar puntos turísticos
function centrarMapa(destino) {
    map.setView(destino.coordenadas, 13);

    // Limpiar marcadores previos
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && !layer._url) {
            map.removeLayer(layer);
        }
    });

    // Añadir marcadores para los lugares turísticos
    destino.lugares.forEach(lugar => {
        L.marker(lugar.coords).addTo(map)
            .bindPopup(`<b>${lugar.nombre}</b>`)
            .openPopup();
    });
}

// Buscar coordenadas de una ciudad usando la API de OpenStreetMap
function buscarCoordenadas(ciudad) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${ciudad},Colombia`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                map.setView([lat, lon], 13);

                L.marker([lat, lon]).addTo(map)
                    .bindPopup(`<b>${ciudad}</b>`)
                    .openPopup();
            } else {
                alert("No se encontraron coordenadas para esta ciudad.");
            }
        })
        .catch(error => {
            console.error("Error al buscar las coordenadas:", error);
            alert("Hubo un problema al buscar la ciudad. Inténtalo de nuevo.");
        });
}

// Inicializar el mapa centrado en Colombia
document.addEventListener('DOMContentLoaded', () => {
    map.setView([4.5709, -74.2973], 5);
});


/*// Configuración inicial del mapa con Leaflet.js
const map = L.map('map').setView([4.5709, -74.2973], 5); // Coordenadas centradas en Colombia

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Datos de coordenadas turísticas por ciudad
const destinos = [
    {
        nombre: "Cartagena",
        descripcion: "Ciudad histórica con playas espectaculares.",
        coordenadas: [10.3910, -75.4794],
        lugares: [
            { nombre: "Castillo de San Felipe", coords: [10.4225, -75.5354] },
            { nombre: "Ciudad Amurallada", coords: [10.4260, -75.5480] }
        ]
    },
    {
        nombre: "Medellín",
        descripcion: "Conocida como la ciudad de la eterna primavera.",
        coordenadas: [6.2442, -75.5812],
        lugares: [
            { nombre: "Comuna 13", coords: [6.2569, -75.6075] },
            { nombre: "Parque Arví", coords: [6.2763, -75.5025] }
        ]
    },
    {
        nombre: "Bogotá",
        descripcion: "Capital cultural y vibrante.",
        coordenadas: [4.7110, -74.0721],
        lugares: [
            { nombre: "Monserrate", coords: [4.6054, -74.0610] },
            { nombre: "Museo del Oro", coords: [4.6019, -74.0716] }
        ]
    },
    {
        nombre: "San Andrés",
        descripcion: "Isla paradisíaca con mar de siete colores.",
        coordenadas: [12.5847, -81.7006],
        lugares: [
            { nombre: "Johnny Cay", coords: [12.5895, -81.6955] },
            { nombre: "Hoyo Soplador", coords: [12.5234, -81.7158] }
        ]
    }
];

// Manejar la búsqueda de destinos
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('search').value.toLowerCase();
    const destino = destinos.find(d => d.nombre.toLowerCase().includes(query));

    if (destino) {
        mostrarDestinos([destino]);
        centrarMapa(destino);
    } else {
        alert("No se encontraron destinos.");
    }
});

// Mostrar los destinos en la lista
function mostrarDestinos(resultados) {
    const lista = document.getElementById('destino-list');
    lista.innerHTML = "";

    resultados.forEach(destino => {
        const item = document.createElement('div');
        item.innerHTML = `<h3>${destino.nombre}</h3><p>${destino.descripcion}</p>`;
        lista.appendChild(item);
    });
}

// Centrar el mapa en la ciudad seleccionada y mostrar puntos turísticos
function centrarMapa(destino) {
    map.setView(destino.coordenadas, 13);

    // Limpiar marcadores previos
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && !layer._url) {
            map.removeLayer(layer);
        }
    });

    // Añadir marcadores para los lugares turísticos
    destino.lugares.forEach(lugar => {
        L.marker(lugar.coords).addTo(map)
            .bindPopup(`<b>${lugar.nombre}</b>`)
            .openPopup();
    });
}

// Inicializar el mapa centrado en Colombia
document.addEventListener('DOMContentLoaded', () => {
    map.setView([4.5709, -74.2973], 5);
});*/

// Configuración inicial del mapa interactivo con Leaflet.js
/*var map = L.map('map').setView([4.5709, -74.2973], 13); // Coordenadas centradas en Colombia

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Datos de coordenadas turísticas por ciudad
const destinos = [
    {
        nombre: "Cartagena",
        descripcion: "Ciudad histórica con playas espectaculares.",
        coordenadas: [10.3910, -75.4794],
        lugares: [
            { nombre: "Castillo de San Felipe", coords: [10.4225, -75.5354] },
            { nombre: "Ciudad Amurallada", coords: [10.4260, -75.5480] }
        ]
    },
    {
        nombre: "Medellín",
        descripcion: "Conocida como la ciudad de la eterna primavera.",
        coordenadas: [6.2442, -75.5812],
        lugares: [
            { nombre: "Comuna 13", coords: [6.2569, -75.6075] },
            { nombre: "Parque Arví", coords: [6.2763, -75.5025] }
        ]
    },
    {
        nombre: "Bogotá",
        descripcion: "Capital cultural y vibrante.",
        coordenadas: [4.7110, -74.0721],
        lugares: [
            { nombre: "Monserrate", coords: [4.6054, -74.0610] },
            { nombre: "Museo del Oro", coords: [4.6019, -74.0716] }
        ]
    },
    {
        nombre: "San Andrés",
        descripcion: "Isla paradisíaca con mar de siete colores.",
        coordenadas: [12.5847, -81.7006],
        lugares: [
            { nombre: "Johnny Cay", coords: [12.5895, -81.6955] },
            { nombre: "Hoyo Soplador", coords: [12.5234, -81.7158] }
        ]
    }
];

// Manejar búsqueda de destinos y mostrar puntos turísticos en el mapa
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('search').value.toLowerCase();
    const destino = destinos.find(d => d.nombre.toLowerCase().includes(query));

    if (destino) {
        mostrarDestinos([destino]);
        centrarMapa(destino);
    } else {
        alert("No se encontraron destinos.");
    }
});

function mostrarDestinos(resultados) {
    const lista = document.getElementById('destino-list');
    lista.innerHTML = "";

    resultados.forEach(destino => {
        const item = document.createElement('div');
        item.innerHTML = `<h3>${destino.nombre}</h3><p>${destino.descripcion}</p>`;
        lista.appendChild(item);
    });
}

function centrarMapa(destino) {
    map.setView(destino.coordenadas, 13);

    // Limpiar marcadores previos
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && !layer._url) {
            map.removeLayer(layer);
        }
    });

    // Añadir marcadores de lugares turísticos
    destino.lugares.forEach(lugar => {
        L.marker(lugar.coords).addTo(map)
            .bindPopup(`<b>${lugar.nombre}</b>`)
            .openPopup();
    });
}

// Mapa inicial (centrado en Colombia)
document.addEventListener('DOMContentLoaded', () => {
    map.setView([4.5709, -74.2973], 5);
});*/


// Destinos simulados
/*const destinos = [
    {  nombre: "Cartagena", descripcion: "Ciudad histórica con playas espectaculares." },
    { nombre: "Medellín", descripcion: "Conocida como la ciudad de la eterna primavera." },
    { nombre: "Bogotá", descripcion: "Capital cultural y vibrante." },
    { nombre: "San Andrés", descripcion: "Isla paradisíaca con mar de siete colores." }
];

// Manejar búsqueda de destinos
document.getElementById('search-form').addEventListener('submit', (e) => { 
    e.preventDefault();
    const query = document.getElementById('search').value.toLowerCase();
    const resultados = destinos.filter(destino => destino.nombre.toLowerCase().includes(query));
    mostrarDestinos(resultados);
});

function mostrarDestinos(resultados) {
    const lista = document.getElementById('destino-list');
    lista.innerHTML = "";
    if (resultados.length === 0) {
        lista.innerHTML = "<p>No se encontraron destinos.</p>";
    } else {
        resultados.forEach(destino => {
            const item = document.createElement('div');
            item.innerHTML = `<h3>${destino.nombre}</h3><p>${destino.descripcion}</p>`;
            lista.appendChild(item);
        });
    }
}

// Generar itinerario básico
document.getElementById('itinerary-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fecha = document.getElementById('fecha').value;
    const result = document.getElementById('itinerario-result');
    result.innerHTML = `<p>Itinerario generado para la fecha: ${fecha}</p>`;
});

// Mapa (placeholder)
document.addEventListener('DOMContentLoaded', () => {
    const map = document.getElementById('map');
    map.innerHTML = "<p>Aquí se mostrará un mapa interactivo (integración futura).</p>";
});*/
