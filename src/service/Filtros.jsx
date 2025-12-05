import  lugares   from "./data.js";

export function filtrarLugares(respuestas) {
  return lugares.filter((lugar) => {
    if (respuestas.presupuesto && lugar.precioCOP > respuestas.presupuesto) {
      return false;
    }

    if (respuestas.distancia && lugar.distancia > respuestas.distancia) {
      return false;
    }

    if (respuestas.tipo && lugar.tipo !== respuestas.tipo) {
      return false;
    }

    if (respuestas.personas && lugar.personas !== respuestas.personas) {
      return false;
    }

    return true;
  });
}
