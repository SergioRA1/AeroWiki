require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(cors());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// --- RUTAS DE LA API ---

// Obtener todos los cazas
app.get('/api/jets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jets ORDER BY name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error("Error al obtener cazas:", err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Obtener un caza específico por ID
app.get('/api/jet/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jets WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Caza no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error al obtener detalle:", err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Obtener misiles compatibles con un caza (Uso de ARRAY en Postgres)
app.get('/api/missiles/:jetId', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM missiles WHERE $1 = ANY(compatible_with)', 
            [req.params.jetId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Error al obtener misiles:", err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// --- INICIO DEL SERVIDOR ---

// Escuchamos en '0.0.0.0' para permitir el acceso desde otros dispositivos (móvil)
app.listen(port, '0.0.0.0', () => {
    console.log(`
🚀 AeroWiki Backend Online!
-----------------------------------
🏠 Local:   http://localhost:${port}
📱 Móvil:   http://192.168.1.110:${port}
-----------------------------------
    `);
});
