// caza.js

// Paso A: Leer el parámetro "?id=..." de la barra de direcciones
const params = new URLSearchParams(window.location.search);
const jetId = params.get('id');

// La constante 'jets' se asume que está definida en 'data.js', que debe ser cargado antes que este script.

// Paso B: Buscar ese ID en nuestra "base de datos" data.js
const jet = jets.find(j => j.id === jetId);

// Si encontramos el avión, rellenamos la página
if (jet) {
    document.title = `${jet.name} - AeroWiki`;
    document.getElementById('detail-title').innerText = jet.name;
    document.getElementById('detail-desc').innerText = jet.shortDesc;
    document.getElementById('detail-fulltext').innerText = jet.fullText;
    document.getElementById('detail-image').src = jet.image;
    
    // CONEXIÓN DEL VIDEO LOCAL
    const videoPlayer = document.getElementById('detail-video-player');
    videoPlayer.src = jet.video; 
    videoPlayer.load(); // Carga el video desde la ruta local
    
    document.getElementById('spec-speed').innerText = jet.specs.speed;
    document.getElementById('spec-range').innerText = jet.specs.range;
    document.getElementById('spec-ceiling').innerText = jet.specs.ceiling;
    document.getElementById('spec-climb-rate').innerText = jet.specs.climbRate;
    document.getElementById('spec-origin').innerText = jet.specs.origin;
    document.getElementById('spec-engine-name').innerText = jet.specs.engineName;
    document.getElementById('spec-power-per-engine').innerText = jet.specs.powerPerEngine;
    document.getElementById('spec-total-power').innerText = jet.specs.totalPowerAfterburner;
    document.getElementById('spec-power-weight').innerText = jet.specs.powerToWeight;

    // ===================================================================
    // SECCIÓN DE MISILES (Armamento)
    // ===================================================================
    // Esta sección renderiza las tarjetas de misiles compatibles con el caza actual.
    // Los datos vienen de missiles.js (cargado antes que caza.js en caza.html).
    // 
    // Funcionamiento:
    // 1. Obtiene el contenedor #missiles-grid del HTML
    // 2. Filtra los misiles que son compatibles con el jetId actual
    //    (usando el array compatibleWith de cada misil)
    // 3. Crea una tarjeta clickeable para cada misil compatible
    // 4. Cada tarjeta enlaza a la futura página misil.html?id=MISSILE_ID
    // 
    // Afecta a: Sección "Armamento" en caza.html (entre descripción y video)
    // ===================================================================
    
    const missilesGrid = document.getElementById('missiles-grid');
    
    if (missilesGrid && typeof missiles !== 'undefined') {
        // Filtrar solo los misiles compatibles con este caza específico
        const compatibleMissiles = missiles.filter(missile => 
            missile.compatibleWith && missile.compatibleWith.includes(jetId)
        );

        // Ordenar por alcance (largo alcance primero / izquierda)
        // Extrae el número del string de alcance para comparar
        compatibleMissiles.sort((a, b) => {
            const rangeA = parseInt(a.range.replace(/[^0-9]/g, '')) || 0;
            const rangeB = parseInt(b.range.replace(/[^0-9]/g, '')) || 0;
            return rangeB - rangeA; // Orden descendente (mayor a menor)
        });

        if (compatibleMissiles.length > 0) {
            // Renderizar cada misil como una tarjeta clickeable
            compatibleMissiles.forEach(missile => {
                const card = document.createElement('a');
                card.href = `misil.html?id=${missile.id}`; // Enlace a página de detalle del misil (aún no creada)
                card.className = 'block bg-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-blue-400 hover:bg-slate-700/50 transition duration-300 group';
                
                card.innerHTML = `
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <h4 class="text-lg font-bold text-white group-hover:text-blue-400 transition">${missile.name}</h4>
                            <p class="text-slate-400 text-sm mt-1">${missile.shortDesc}</p>
                            <div class="flex gap-3 mt-3">
                                <span class="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">${missile.type}</span>
                                <span class="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">Alcance: ${missile.range}</span>
                            </div>
                        </div>
                        <svg class="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                `;
                
                missilesGrid.appendChild(card);
            });
        } else {
            // Mostrar mensaje si no hay misiles configurados para este caza
            missilesGrid.innerHTML = '<p class="text-slate-500 italic text-sm">No hay información de armamento disponible.</p>';
        }
    }
} else {
    // Si alguien pone un ID inventado en la URL
    document.body.innerHTML = "<h1 class='text-white text-center mt-20'>Avión no encontrado :(</h1>";
}