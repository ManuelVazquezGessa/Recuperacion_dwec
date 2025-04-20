function areaPiramide(lado, altura) {
    if (lado <= 0 || altura <= 0) {
        throw new Error("Los parámetros de entrada deben tener valores positivos");
    }

    let areaBase = Math.pow(lado, 2);
    let areaLateral = 2 * lado * Math.sqrt(Math.pow(altura, 2) + Math.pow(lado / 2, 2));
    let areaTotal = areaBase + areaLateral;

    return Number(areaTotal.toFixed(5));
}
