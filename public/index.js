let jets = [];

async function loadAndRenderJets() {
    try {
        const res = await fetch('/api/jets');
        jets = await res.json();

        const gridContainer = document.getElementById('jets-grid');
        if (gridContainer) {
            gridContainer.innerHTML = '';
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
                        <p class="text-slate-400 text-sm mb-4 line-clamp-2">${jet.short_desc || 'Sin descripción'}</p>
                        <span class="text-blue-400 text-sm font-semibold">Leer más &rarr;</span>
                    </div>
                `;
                gridContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Error cargando la flota:", error);
    }
}

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

function renderResults(results) {
    searchResults.innerHTML = '';
    if (results.length > 0) {
        searchResults.style.display = 'flex';
        results.forEach(jet => {
            const suggestion = document.createElement('a');
            suggestion.href = `caza.html?id=${jet.id}`;
            suggestion.className = 'suggestion-item';
            // Usamos jet.origin directamente (PostgreSQL)
            suggestion.innerHTML = `
                <span class="font-semibold">${jet.name}</span>
                <span class="text-xs text-slate-400 ml-2">${jet.origin || ''}</span>
            `;
            searchResults.appendChild(suggestion);
        });
    } else {
        searchResults.style.display = 'none';
    }
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === '') {
            searchResults.style.display = 'none';
            return;
        }
        const filtered = jets.filter(j => j.name.toLowerCase().includes(query));
        renderResults(filtered);
    });
}

loadAndRenderJets();
