const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para parsear datos
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos desde 'node_modules' para los estilos de Toastify
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para la página de cotización
app.get('/cotizacion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cotizacion.html'));
});

// Ruta para manejar el envío del formulario
app.post('/submit', async (req, res) => {
    const { model, color, storage, battery, usageTime, condition, details } = req.body;

    const data = {
        model,
        color,
        storage,
        battery,
        usageTime,
        condition,
        details
    };

    try {
        const filePath = path.join(__dirname, 'data.json');
        let fileData = [];
        if (await fs.pathExists(filePath)) {
            fileData = await fs.readJson(filePath);
        }
        fileData.push(data);
        await fs.writeJson(filePath, fileData);

        res.send('Formulario enviado con éxito');
    } catch (err) {
        console.error('Error al guardar los datos:', err);
        res.status(500).send('Error al guardar los datos');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});