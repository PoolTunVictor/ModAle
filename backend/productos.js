const express = require('express');
const router = express.Router();
const { poolPromise } = require('./db');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Productos');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener productos');
    }
});

module.exports = router;
