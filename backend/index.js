const express = require('express');
const app = express();
const PORT = 3000;

const productosRouter = require('./productos');

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Backend funcionando 🚀');
});

// Ruta de productos
app.use('/api/productos', productosRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
