async function loadJetDetails() {
    const params = new URLSearchParams(window.location.search);
    const jetId = params.get('id');

    if (!jetId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`/api/jet/${jetId}`);
        const jet = await response.json();

        if (!jet) {
            document.body.innerHTML = '<h1 class="text-white text-center mt-20">Caza no encontrado</h1>';
            return;
        }

        // Datos básicos
        document.title = `AeroWiki - ${jet.name}`;
        document.getElementById('detail-title').innerText = jet.name;
        document.getElementById('detail-image').src = jet.image;
        document.getElementById('detail-desc').innerText = jet.short_desc;
        document.getElementById('detail-fulltext').innerText = jet.full_text;

        // VIDEO: Corregido para usar la columna 'video' del INSERT de SQL
        const videoElement = document.getElementById('detail-video-player');
        if (jet.video) {
            videoElement.src = jet.video;
            videoElement.load(); // Forzamos la carga del nuevo recurso
            videoElement.play().catch(e => console.log("Auto-play prevenido por el navegador"));
        }

        // ESPECIFICACIONES (JSONB)
        const s = jet.specs || {};
        document.getElementById('spec-speed').innerText = s.speed || 'N/A';
        document.getElementById('spec-range').innerText = s.range || 'N/A';
        document.getElementById('spec-ceiling').innerText = s.ceiling || 'N/A';
        document.getElementById('spec-climb-rate').innerText = s.climbRate || 'N/A';
        document.getElementById('spec-origin').innerText = s.origin || 'N/A';
        
        // Motores
        document.getElementById('spec-engine-name').innerText = s.engineName || 'Motor';
        document.getElementById('spec-power-per-engine').innerText = s.powerPerEngine || 'N/A';
        document.getElementById('spec-total-power').innerText = s.totalPowerAfterburner || 'N/A';
        document.getElementById('spec-power-weight').innerText = s.powerToWeight || 'N/A';

        // Cargar misiles
        loadCompatibleMissiles(jetId);

    } catch (error) {
        console.error("Error en caza.js:", error);
    }
}

async function loadCompatibleMissiles(jetId) {
    const missilesGrid = document.getElementById('missiles-grid');
    try {
        const res = await fetch(`/api/missiles/${jetId}`);
        const missiles = await res.json();
        missilesGrid.innerHTML = '';
        if (missiles.length > 0) {
            missiles.forEach(m => {
                const card = document.createElement('div');
                card.className = 'bg-slate-700/50 p-4 rounded-xl border border-slate-600';
                card.innerHTML = `
                    <h4 class="font-bold text-blue-400">${m.name}</h4>
                    <p class="text-xs text-slate-400 mb-1">${m.type} | Alcance: ${m.range}</p>
                    <p class="text-sm text-slate-300">${m.short_desc}</p>
                `;
                missilesGrid.appendChild(card);
            });
        } else {
            missilesGrid.innerHTML = '<p class="text-slate-500 italic">Sin datos de misiles.</p>';
        }
    } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', loadJetDetails);
