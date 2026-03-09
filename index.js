// index.js
// Este archivo maneja la funcionalidad de la página principal (index.html)
// y la barra de búsqueda compartida en ambas páginas (index.html y caza.html)

// ===================================================================
// FUNCIONALIDAD DE GRID (Solo página principal - index.html)
// ===================================================================
// Renderiza las tarjetas de los cazas en la página principal.
// Solo se ejecuta si el elemento #jets-grid existe (página principal).
// ===================================================================

const gridContainer = document.getElementById('jets-grid');

// Verificar que el elemento existe antes de renderizar (previene errores en otras páginas)
if (gridContainer && typeof jets !== 'undefined') {
    jets.forEach(jet => {
        const card = document.createElement('a');
        card.href = `caza.html?id=${jet.id}`; 
        card.className = 'block bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 border border-slate-700 group';
        card.innerHTML = `
            <div class="h-48 overflow-hidden">
                <img src="${jet.image}" alt="${jet.name}" class="w-full h-full object-cover group-hover:opacity-90 transition">
            </div>
            <div class="p-6">
                <h3 class="text-2xl font-bold text-white mb-2">${jet.name}</h3>
                <p class="text-slate-400 text-sm mb-4 line-clamp-2">${jet.shortDesc}</p>
                <span class="text-blue-400 text-sm font-semibold">Leer más &rarr;</span>
            </div>
        `;
        gridContainer.appendChild(card);
    });
}


// ===================================================================
// FUNCIONALIDAD DE BÚSQUEDA (Compartida entre index.html y caza.html)
// ===================================================================
// Gestiona la barra de búsqueda del header.
// Se ejecuta en ambas páginas pero solo si los elementos existen.
// Muestra resultados en un dropdown vertical con scroll.
// ===================================================================

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

const ACTIVE_CLASSES = ['rounded-b-none', 'border-b-0']; 

// Configuración de caché de búsqueda
const JETS_PER_PAGE = 3; 
let currentResultIndex = 0; 
let filteredJetsCache = []; 

/**
 * Renderiza todos los resultados de búsqueda en el dropdown vertical.
 * @param {Array} results - Lista completa de jets a mostrar.
 */
function renderResults(results) {
    searchResults.innerHTML = ''; 

    // Mostrar todos los resultados en slider vertical
    if (results.length > 0) {
        searchResults.style.display = 'flex'; 

        results.forEach(jet => {
            const suggestion = document.createElement('a');
            suggestion.href = `caza.html?id=${jet.id}`; 
            suggestion.className = 'suggestion-item';
            suggestion.innerHTML = `
                <span class="font-semibold">${jet.name}</span> 
                <span class="text-xs text-slate-400 ml-2">${jet.specs.origin}</span>
            `;
            searchResults.appendChild(suggestion);
        });

    } else {
         searchInput.classList.remove(...ACTIVE_CLASSES); 
         const noResults = document.createElement('div');
         noResults.className = 'suggestion-item text-slate-500 italic';
         noResults.innerText = 'No se encontraron resultados.';
         searchResults.style.display = 'block';
         searchResults.appendChild(noResults);
    }
}

// ===================================================================
// EVENT LISTENERS DE BÚSQUEDA
// ===================================================================
// Solo se agregan si los elementos de búsqueda existen en la página.
// Esto permite que index.js se cargue en ambas páginas sin errores.
// ===================================================================

// Verificar que los elementos de búsqueda existen antes de agregar listeners
if (searchInput && searchResults) {

// 1. Evento de ESCRITURA (input) - Filtra mientras el usuario escribe
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();

    if (query.length === 0) {
        searchInput.classList.remove(...ACTIVE_CLASSES);
        searchResults.style.display = 'none'; 
        filteredJetsCache = [];
        return; 
    }

    filteredJetsCache = jets.filter(jet => 
        jet.name.toLowerCase().includes(query) || 
        jet.shortDesc.toLowerCase().includes(query)
    );

    searchInput.classList.add(...ACTIVE_CLASSES);

    renderResults(filteredJetsCache);
});


// 2. Evento de ENFOQUE (focus) - Muestra las opciones iniciales
searchInput.addEventListener('focus', () => {
    // Solo si la caja de búsqueda está vacía
    if (searchInput.value.trim().length === 0) {
        filteredJetsCache = jets;
        searchInput.classList.add(...ACTIVE_CLASSES);
        renderResults(filteredJetsCache);
    }
});

// 3. Evento de CLIC FUERA (click) - Oculta todo
document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        searchInput.classList.remove(...ACTIVE_CLASSES);
        filteredJetsCache = []; 
    }
});
}