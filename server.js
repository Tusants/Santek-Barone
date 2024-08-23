const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const port = 3000;


app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/cotizacion', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cotizacion.html'));
});

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

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});