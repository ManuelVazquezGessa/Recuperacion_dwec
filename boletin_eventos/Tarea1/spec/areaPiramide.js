describe("Función areaPiramide", function () {

    it("debería calcular correctamente con lado 6.8 y altura 9", function () {
        const resultado = areaPiramide(6.8, 9);
        expect(Number(resultado.toFixed(3))).toBeCloseTo(177.083, 3);
    });

    it("debería calcular correctamente con lado 7.1 y altura 9.4", function () {
        const resultado = areaPiramide(7.1, 9.4);
        expect(Number(resultado.toFixed(3))).toBeCloseTo(193.092, 3);
    });

    it("debería calcular correctamente con lado 7.4 y altura 9.8", function () {
        const resultado = areaPiramide(7.4, 9.8);
        expect(Number(resultado.toFixed(3))).toBeCloseTo(209.793, 3);
    });

    it("debería devolver un número", function () {
        let resultado = areaPiramide(6.8, 9);
        expect(typeof resultado).toBe("number");
    });

    it("debería lanzar un error si el lado es negativo", function () {
        expect(function () {
            areaPiramide(-5, 10);
        }).toThrowError("Los parámetros de entrada deben tener valores positivos");
    });

    it("debería lanzar un error si la altura es negativa", function () {
        expect(function () {
            areaPiramide(5, -10);
        }).toThrowError("Los parámetros de entrada deben tener valores positivos");
    });
});
