import lugares from "./data.js";

export function filtrarLugares(respuestas) {
  return lugares.filter((lugar) => {

    // FILTRO PRECIO NUMÉRICO
    if (respuestas.precioCOP) {
      const precioNum = parseInt(respuestas.precioCOP.replace(/[^0-9]/g, ""));
      if (lugar.precioCOP > precioNum) return false;
    }

    // DISTANCIA
    if (respuestas.distanciaMaxima) {
      const distNum = parseInt(respuestas.distanciaMaxima.replace(/[^0-9]/g, ""));
      if (lugar.distanciaMaxima > distNum) return false;
    }

    // TIPO DE PLAN
    if (respuestas.tipo && lugar.tipo !== respuestas.tipo) {
      return false;
    }

    // PERSONAS
    if (respuestas.personas && lugar.personas !== respuestas.personas) {
      return false;
    }

    // RATING
    if (respuestas.rating && lugar.rating < respuestas.rating) {
      return false;
    }

    // TIPO ACTIVIDAD
    if (respuestas.tipoActividad && lugar.tipoActividad !== respuestas.tipoActividad) {
      return false;
    }

    // CATEGORÍA
    if (respuestas.categoria && lugar.categoria !== respuestas.categoria) {
      return false;
    }

    // CLIMA
    if (respuestas.clima && lugar.clima !== respuestas.clima) {
      return false;
    }

    // PRESUPUESTO (bajo/medio/alto)
    if (respuestas.presupuesto && lugar.presupuesto !== respuestas.presupuesto) {
      return false;
    }

    // TIEMPO DE VISITA
    if (respuestas.tiempoVisita && lugar.tiempoVisita !== respuestas.tiempoVisita) {
      return false;
    }

    // ACCESIBILIDAD
    if (respuestas.accesibilidad && lugar.accesibilidad !== respuestas.accesibilidad) {
      return false;
    }

    // MEJOR ÉPOCA
    if (respuestas.mejorEpoca && lugar.mejorEpoca !== respuestas.mejorEpoca) {
      return false;
    }

    return true;
  });
}
