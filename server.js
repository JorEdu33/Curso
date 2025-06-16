const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/comparar-tamano-muestra', (req, res) => {
    const { z1, n } = req.body;

    // Definir parámetros
    const sigma = 0.3;
    const x = 2.6;
    const alpha = 0.05;
    const e = 0.05;

    // Calcular el valor crítico de la distribución normal (Z)
    const Z = 1.96; // Z para un intervalo de confianza del 95% (valor tabulado)

    // Calcular el tamaño de muestra necesario
    const esperadoN = Math.ceil((Z * (sigma / e)) ** 2);

    // Comparar con los valores ingresados
    let puntos = 0;
    if (Math.abs(z1 - Z) < 0.01) puntos++;  // Comparar con Z calculado (1.96)
    if (Math.abs(n - esperadoN) < 0.01) puntos++; // Comparar tamaño de muestra

    // Asignar calificación
    let nota = "0.0";
    if (puntos === 2) {
        nota = "Perfecto 5.0";
    } else if (puntos === 1) {
        nota = "Insuficiente 2.0";
    } else {
        nota = "Incorrecto 0.0";
    }

    res.json({ mensaje: nota });
});

app.post('/comparar-intervalos', (req, res) => {
    const { Lizq1, Lder1, Lizq2, Lder2 } = req.body;

    // Definir valores esperados
    const n = 36;
    const sigma = 0.3;
    const x = 2.6;

    // Calcular intervalos esperados
    const z1 = 1.96; // Valor Z para 95%
    const esperadoLizq1 = x - z1 * (sigma / Math.sqrt(n));
    const esperadoLder1 = x + z1 * (sigma / Math.sqrt(n));

    const z2 = 2.576; // Valor Z para 99%
    const esperadoLizq2 = x - z2 * (sigma / Math.sqrt(n));
    const esperadoLder2 = x + z2 * (sigma / Math.sqrt(n));

    // Comparar con los valores ingresados
    let puntos = 0;
    if (Math.abs(Lizq1 - esperadoLizq1) < 0.01) puntos++;
    if (Math.abs(Lder1 - esperadoLder1) < 0.01) puntos++;
    if (Math.abs(Lizq2 - esperadoLizq2) < 0.01) puntos++;
    if (Math.abs(Lder2 - esperadoLder2) < 0.01) puntos++;

    // Asignar calificación
    let nota = "0.0";
    if (puntos === 4) {
        nota = "Perfecto 5.0";
    } else if (puntos === 3) {
        nota = "Bien 4.0";
    } else if (puntos === 2) {
        nota = "Regular 3.0";
    } else if (puntos === 1) {
        nota = "Insuficiente 2.0";
    } else {
        nota = "Incorrecto 0.0";
    }

    res.json({ mensaje: nota });
});

app.post('/compararvectores', (req, res) => {
    const datos = req.body;
    const vector1 = datos.vector1;
    const vector2 = datos.vector2;
    const resultado = datos.resultado;

    // Definir los valores esperados
    let esperadoVector1 = [];
    for (let i = 1; i <= 10; i++) {
        esperadoVector1.push(i);
    }

    let esperadoVector2 = [];
    for (let i = 1; i <= 15; i++) {
        esperadoVector2.push(i);
    }

    let esperadoResultado = [];
    for (let i = 1; i <= 15; i++) {
        if (!esperadoVector1.includes(i)) {
            esperadoResultado.push(i);
        }
    }

    // Contar coincidencias
    let puntos = 0;
    if (JSON.stringify(vector1) === JSON.stringify(esperadoVector1)) {
        puntos++;
    }
    if (JSON.stringify(vector2) === JSON.stringify(esperadoVector2)) {
        puntos++;
    }
    if (JSON.stringify(resultado) === JSON.stringify(esperadoResultado)) {
        puntos++;
    }

    // Asignar calificación
    let nota = "0.0";
    if (puntos === 3) {
        nota = "Perfecto 5.0";
    } else if (puntos === 2) {
        nota = "Bien 3.5";
    } else if (puntos === 1) {
        nota = "Insuficiente 2.0";
    } else {
        nota = "Incorrecto 0.0";
    }

    res.json({ mensaje: nota });
});

app.get('/numeros', (req, res) => {
    const numeros = [];
    for (let i = 1; i <= 100; i++) {
        numeros.push(i);
    }
    res.json({ numeros });
});


app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port);
});
